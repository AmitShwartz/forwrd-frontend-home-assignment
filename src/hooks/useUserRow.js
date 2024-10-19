import { useCallback, useMemo, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
  countrySchema,
  emailSchema,
  nameSchema,
  phoneBlurSchema,
  phoneSchema,
} from '../validations/user.schema';
import useUsersStore from './useUsersStore';
import { USER_FIELDS } from '../utils/strings.utils';

const BLUR = 'blur';
const CHANGE = 'change';

const useUserRow = (userId) => {
  const {
    users,
    removeUser,
    addDirtyField,
    setErrorsByUserIdAndField,
    errors,
    dirtyFields,
  } = useUsersStore();

  const userDirtyFields = useMemo(() => dirtyFields[userId], [dirtyFields, userId]);
  const isDirty = useMemo(() => !!userDirtyFields, [userDirtyFields]);

  const { name, country, email, phone } = useMemo(
    () => users[userId] ?? {},
    [users, userId]
  );

  const { errorName, errorCountry, errorEmail, errorPhone } = useMemo(
    () => ({
      errorName: errors[userId]?.name?.message,
      errorCountry: errors[userId]?.country?.message,
      errorEmail: errors[userId]?.email?.message,
      errorPhone: errors[userId]?.phone?.message,
    }),
    [errors, userId]
  );

  const handleRemoveUser = useCallback(() => removeUser(userId), [removeUser, userId]);

  const getValidationSchema = useCallback((field, type) => {
    let validationSchema = null;
    switch (field) {
      case USER_FIELDS.name:
        validationSchema = nameSchema;
        break;
      case USER_FIELDS.country:
        validationSchema = countrySchema;
        break;
      case USER_FIELDS.email:
        validationSchema = type === BLUR ? emailSchema : null;
        break;
      case USER_FIELDS.phone:
        validationSchema = type === BLUR ? phoneBlurSchema : phoneSchema;
        break;
      default:
        break;
    }
    return validationSchema;
  }, []);

  const runValidation = useCallback(
    (field, value, type) => {
      const validationSchema = getValidationSchema(field, type);

      const validationResult = validationSchema
        ? validationSchema.safeParse(value)
        : { success: true };

      const error = validationResult.success ? null : validationResult.error.errors[0];

      setErrorsByUserIdAndField(userId, field, error);
    },
    [getValidationSchema, setErrorsByUserIdAndField, userId]
  );

  const onChangeHandler = useDebouncedCallback((field, value) => {
    runValidation(field, value, CHANGE);
    addDirtyField(userId, field, value);
  }, 500);

  const onBlurHandler = useCallback(
    (field, value) => {
      if (isDirty || !value) runValidation(field, value, BLUR);
    },
    [isDirty, runValidation]
  );

  const rowRef = useRef(null);

  const handleRowBlur = useCallback(
    (event) => {
      if (isDirty && !rowRef.current.contains(event.relatedTarget)) {
        for (const field in userDirtyFields) {
          onBlurHandler(field, userDirtyFields[field]);
        }
      }
    },
    [isDirty, onBlurHandler, userDirtyFields]
  );

  return {
    name: userDirtyFields?.name ?? name,
    country: userDirtyFields?.country ?? country,
    email: userDirtyFields?.email ?? email,
    phone: userDirtyFields?.phone ?? phone,
    onChangeHandler,
    onBlurHandler,
    errorName,
    errorCountry,
    errorEmail,
    errorPhone,
    handleRowBlur,
    rowRef,
  };
};

export default useUserRow;
