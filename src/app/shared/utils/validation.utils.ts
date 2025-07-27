import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validators for form validation
 */
export class CustomValidators {
  /**
   * Email validator with more comprehensive regex
   */
  static email(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(control.value) ? null : { email: true };
  }

  /**
   * Strong password validator
   */
  static strongPassword(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;
    
    const errors: any = {};
    
    if (!hasUpperCase) errors.missingUpperCase = true;
    if (!hasLowerCase) errors.missingLowerCase = true;
    if (!hasNumeric) errors.missingNumeric = true;
    if (!hasSpecialChar) errors.missingSpecialChar = true;
    if (!isValidLength) errors.minLength = true;
    
    return Object.keys(errors).length ? { strongPassword: errors } : null;
  }

  /**
   * Phone number validator
   */
  static phoneNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(control.value.replace(/\s/g, '')) ? null : { phoneNumber: true };
  }

  /**
   * URL validator
   */
  static url(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    try {
      new URL(control.value);
      return null;
    } catch {
      return { url: true };
    }
  }

  /**
   * Match validator for password confirmation
   */
  static match(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;
      
      const matchControl = parent.get(matchTo);
      if (!matchControl) return null;
      
      return control.value === matchControl.value ? null : { match: true };
    };
  }

  /**
   * Minimum age validator
   */
  static minAge(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age - 1 } };
      }
      
      return age >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age } };
    };
  }

  /**
   * File size validator
   */
  static fileSize(maxSizeInMB: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const file = control.value as File;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      
      return file.size <= maxSizeInBytes ? null : { 
        fileSize: { 
          maxSize: maxSizeInMB, 
          actualSize: Math.round(file.size / 1024 / 1024 * 100) / 100 
        } 
      };
    };
  }

  /**
   * File type validator
   */
  static fileType(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const file = control.value as File;
      const fileType = file.type.toLowerCase();
      
      return allowedTypes.some(type => fileType.includes(type.toLowerCase())) 
        ? null 
        : { fileType: { allowedTypes, actualType: fileType } };
    };
  }
}

/**
 * Form utility functions
 */
export class FormUtils {
  /**
   * Mark all form controls as touched
   */
  static markFormGroupTouched(formGroup: AbstractControl): void {
    Object.keys(formGroup.value).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
        
        if (control.value && typeof control.value === 'object') {
          this.markFormGroupTouched(control);
        }
      }
    });
  }

  /**
   * Get form validation errors
   */
  static getFormErrors(form: AbstractControl): any {
    let formErrors: any = {};

    Object.keys(form.value).forEach(key => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });

    return formErrors;
  }

  /**
   * Reset form to initial state
   */
  static resetForm(form: AbstractControl, initialValue?: any): void {
    form.reset(initialValue);
    form.markAsUntouched();
    form.markAsPristine();
  }
}