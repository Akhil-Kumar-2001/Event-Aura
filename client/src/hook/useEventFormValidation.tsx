import { useState } from "react";
import type { EventFormElements } from "../Types/basicTypes";

interface ValidationErrors {
  title?: string;
  venue?: string;
  description?: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  ticketPrice?: string;
  ticketCount?: string;
  coverImage?: string;
  dateTime?: string;
}

export function useEventFormValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Validate individual field
  const validateField = (name: string, value: string, formElements?: EventFormElements): string | undefined => {
    switch (name) {
      case 'title':
        if (!value.trim()) return 'Event title is required';
        if (value.trim().length < 5) return 'Event title must be at least 5 characters';
        if (value.trim().length > 100) return 'Event title must not exceed 100 characters';
        break;

      case 'venue':
        if (!value.trim()) return 'Venue is required';
        if (value.trim().length < 5) return 'Venue must be at least 5 characters';
        if (value.trim().length > 100) return 'Venue must not exceed 100 characters';
        break;

      case 'description':
        if (!value.trim()) return 'Description is required';
        if (value.trim().length < 10) return 'Description must be at least 10 characters';
        if (value.trim().length > 1000) return 'Description must not exceed 1000 characters';
        break;

      case 'address':
        if (!value.trim()) return 'Address is required';
        if (value.trim().length < 5) return 'Address must be at least 5 characters';
        if (value.trim().length > 200) return 'Address must not exceed 200 characters';
        break;

      case 'startDate':
        if (!value) return 'Start date is required';
        const startDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (startDate < today) return 'Start date cannot be in the past';
        break;

      case 'endDate':
        if (!value) return 'End date is required';
        if (formElements) {
          const startDate = new Date(formElements.startDate.value);
          const endDate = new Date(value);
          if (endDate < startDate) return 'End date must be after start date';
          const oneYearLater = new Date(startDate);
          oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
          if (endDate > oneYearLater) return 'Event duration cannot exceed 1 year';
        }
        break;

      case 'startTime':
        if (!value) return 'Start time is required';
        break;

      case 'endTime':
        if (!value) return 'End time is required';
        if (formElements) {
          const startDate = formElements.startDate.value;
          const endDate = formElements.endDate.value;
          const startTime = formElements.startTime.value;
          if (startDate === endDate && value <= startTime) {
            return 'End time must be after start time on the same date';
          }
        }
        break;

      case 'ticketPrice':
        if (!value) return 'Ticket price is required';
        const price = parseFloat(value);
        if (isNaN(price)) return 'Please enter a valid price';
        if (price < 0) return 'Ticket price cannot be negative';
        if (price > 10000) return 'Ticket price seems too high (max $10,000)';
        break;

      case 'ticketCount':
        if (!value) return 'Available tickets count is required';
        if (!/^\d+$/.test(value)) return 'Please enter a valid whole number';
        const count = parseInt(value, 10);
        if (isNaN(count)) return 'Please enter a valid number';
        if (count < 1) return 'At least 1 ticket must be available';
        if (count > 100000) return 'Maximum 100,000 tickets allowed';
        break;
    }
    return undefined;
  };

  // Validate datetime combination
  const validateDateTime = (formElements: EventFormElements): string | undefined => {
    const startDate = formElements.startDate.value;
    const endDate = formElements.endDate.value;
    const startTime = formElements.startTime.value;
    const endTime = formElements.endTime.value;

    if (startDate && endDate && startTime && endTime) {
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);
      if (endDateTime <= startDateTime) {
        return 'Event end date and time must be after start date and time';
      }
      const durationMinutes = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);
      if (durationMinutes < 15) {
        return 'Event must be at least 15 minutes long';
      }
    }
    return undefined;
  };

  // Validate image
  const validateImage = (file: File): string | undefined => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (file.size > maxSize) {
      return 'Image size must be less than 10MB';
    }
    if (!allowedTypes.includes(file.type)) {
      return 'Only JPG, PNG, GIF, and WebP images are allowed';
    }
    return undefined;
  };

  // Validate all fields
  const validateForm = (formElements: EventFormElements): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    Object.keys(formElements).forEach((key) => {
      if (key in formElements) {
        const element = formElements[key as keyof EventFormElements] as HTMLInputElement | HTMLTextAreaElement;
        if (element && 'value' in element) {
          const error = validateField(key, element.value, formElements);
          if (error) {
            newErrors[key as keyof ValidationErrors] = error;
          }
        }
      }
    });

    const dateTimeError = validateDateTime(formElements);
    if (dateTimeError) {
      newErrors.dateTime = dateTimeError;
    }

    if (selectedImage) {
      const imageError = validateImage(selectedImage);
      if (imageError) {
        newErrors.coverImage = imageError;
      }
    }

    return newErrors;
  };

  // Handle real-time field validation
  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const form = e.target.form;
    if (!form) return;

    const formElements = form.elements as EventFormElements;
    const fieldError = validateField(name, value, formElements);

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));

    if (['startDate', 'endDate', 'startTime', 'endTime'].includes(name)) {
      const dateTimeError = validateDateTime(formElements);
      setErrors((prev) => ({
        ...prev,
        dateTime: dateTimeError,
      }));
    }
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageError = validateImage(file);
      if (imageError) {
        setErrors((prev) => ({ ...prev, coverImage: imageError }));
        return;
      }

      setSelectedImage(file);
      setErrors((prev) => ({ ...prev, coverImage: undefined }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    errors,
    selectedImage,
    imagePreview,
    setSelectedImage,
    setImagePreview,
    setErrors,
    validateForm,
    handleFieldBlur,
    handleImageChange,
  };
}