import React, { useMemo } from 'react';
import Styled from '@emotion/styled';
import useUsersStore from '../../../hooks/useUsersStore';
import { observer } from 'mobx-react';
import {
  ERROR_CODE_INVALID_ENUM_VALUE,
  ERROR_CODE_TOO_SMALL,
} from '../../../utils/strings.utils';

const ErrorsTitle = Styled.h3({
  width: '100%',
  textAlign: 'center',
  color: 'white',
});

const ErrorsContainer = () => {
  const { errors } = useUsersStore();

  const { empty, invalid } = useMemo(() => {
    let empty = 0;
    let invalid = 0;
    Object.values(errors).forEach((userErrors) => {
      const userErrorsArray = Object.values(userErrors);
      userErrorsArray.forEach((error) => {
        if (
          error?.code === ERROR_CODE_TOO_SMALL ||
          error?.code === ERROR_CODE_INVALID_ENUM_VALUE
        ) {
          empty++;
          return;
        }
        invalid++;
      });
    });
    return { empty, invalid };
  }, [errors]);

  const text = useMemo(
    () => `Errors: Empty Fields - ${empty}, Invalid Fields - ${invalid}`,
    [empty, invalid]
  );

  return <ErrorsTitle>{text}</ErrorsTitle>;
};

export default observer(ErrorsContainer);
