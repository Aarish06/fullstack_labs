import { useState } from "react";
import { organizationService } from "../services/organizationService";

interface RoleFormData {
  firstName: string;
  lastName: string;
  role: string;
}

interface RoleFormErrors {
  firstName?: string;
  lastName?: string;
  role?: string;
}

interface RoleFormResult {
  success: boolean;
  message?: string;
}

export function useRoleForm() {
  const [formData, setFormData] = useState<RoleFormData>({
    firstName: "",
    lastName: "",
    role: "",
  });

  const [errors, setErrors] = useState<RoleFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field: keyof RoleFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = async (): Promise<boolean> => {
    const newErrors: RoleFormErrors = {};

    // Validate first name
    const firstNameError = organizationService.validateFirstName(formData.firstName);
    if (firstNameError) {
      newErrors.firstName = firstNameError;
    }

    // Validate role (async)
    const roleError = await organizationService.validateRole(formData.role);
    if (roleError) {
      newErrors.role = roleError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (): Promise<RoleFormResult> => {
    if (submitting) return { success: false, message: "Already submitting" };

    try {
      setSubmitting(true);
      
      if (!(await validateForm())) {
        return {
          success: false,
          message: "Please fix the errors before submitting.",
        };
      }

      return await organizationService.createRole(formData);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      role: "",
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    submitting,
    updateField,
    submitForm,
    resetForm,
    validateForm,
  };
}
