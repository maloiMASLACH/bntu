import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

import "./sign-up.styles.css";
import { useNavigate } from "react-router-dom";
import { SignUpType } from "./sign-up.model";
import { FirebaseContext, useModal } from "../../utils";
import { RouterLinks } from "../../constants";
import { AlertWindow, SpinLoaderLight } from "../../shared";
import { UnitDto } from "../../types";

export const SignUpPage: React.FC = () => {
  const [isSecured, toggleSecured] = useModal(true);
  const [isLoading, toggleLoading] = useModal(false);

  const [errorMessage, setError] = useState("");
  const [units, setUnits] = useState<UnitDto[]>([]);

  const navigate = useNavigate();

  const firebase = useContext(FirebaseContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>();

  useEffect(() => {
    firebase.units().once("value", (snapshot) => {
      setUnits(Object.values(snapshot.val()));
    });
  }, []);

  const handleFormSubmit = (data: SignUpType) => {
    if (data.password !== data.repeatPassword) {
      setError("Пароли не совпадают");
    } else {
      toggleLoading();
      firebase
        .doCreateUserWithEmailAndPassword(data.email, data.password)
        .then((res) => {
          firebase
            .setUser(res.user!.uid, {
              uid: res.user!.uid,
              isAdmin: false,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              group: data.group,
              faculty: units[data.faculty],
              avatar: "",
              number: data.number || ''
            })
            .catch((e) => {
              setError(e.message);
              toggleLoading();
            });
        })
        .then(() => {
          navigate(RouterLinks.Landing);
        })
        .catch((e) => {
          setError(e.message);
          toggleLoading();
        });
    }
  };

  const handleGoSignIn = () => {
    navigate(`../${RouterLinks.SingIn}`);
  };

  const handleClearErrorMessage = () => {
    setError("");
  };

  return (
    <form className="signUpWrapper">
      <p className="signUpDescription">Создайте новый аккаунт</p>
      <div className="signUpFIO">
        <TextField
          color="success"
          id="firstName-basic"
          error={!!errors.firstName}
          label="Имя"
          variant="outlined"
          helperText={errors.firstName ? errors.firstName.message : "Ваше имя"}
          {...register("firstName", {
            required: { value: true, message: "Поле обязательно" },
            pattern: {
              value: /[a-zA-Zа-яА-Я]$/,
              message: "Не корретный формат",
            },
          })}
        />
        <TextField
          color="success"
          id="lastName-basic"
          error={!!errors.lastName}
          label="Фамилия"
          variant="outlined"
          helperText={
            errors.lastName ? errors.lastName.message : "Ваша фамилия"
          }
          {...register("lastName", {
            required: { value: true, message: "Поле обязательно" },
            pattern: {
              value: /[a-zA-Zа-яА-Я]$/,
              message: "Не корретный формат",
            },
          })}
        />
      </div>
      <TextField
        color="success"
        id="email-basic"
        error={!!errors.email}
        label="Email"
        variant="outlined"
        helperText={errors.email ? errors.email.message : "Ваша почта"}
        {...register("email", {
          required: { value: true, message: "Поле обязательно" },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: "Не корретный формат",
          },
        })}
      />

      <TextField
        color="success"
        id="phone-basic"
        error={!!errors.number}
        label="Телефон"
        type="tel"
        variant="outlined"
        helperText={
            errors.number ? errors.number.message : "Ваш номер телефона"
          }
        {...register("number", {
          required: { value: false, message: "Поле не обязательно" },
          minLength: {
            value: 13,
            message: "Не корретный формат",
          },
          maxLength: {
            value: 13,
            message: "Не корретный формат",
          },
          pattern: {
            value: /[+0-9]$/,
            message: "Не корретный формат",
          },
        })}
      />

      <TextField
        color="success"
        id="group-basic"
        error={!!errors.group}
        label="Group"
        variant="outlined"
        helperText={errors.group ? errors.group.message : "Номер вашей группы"}
        {...register("group", {
          required: { value: true, message: "Поле обязательно" },
          pattern: {
            value: /[0-9]$/,
            message: "Не корретный формат",
          },
        })}
      />
      <FormControl fullWidth error={!!errors.faculty} color="success">
        <InputLabel id="select-label">Faculty</InputLabel>
        <Select
          id="faculty-select"
          label="Факультет"
          {...register("faculty", {
            required: { value: true, message: "Поле обязательно" },
          })}
        >
          {units.map((unit, index) => (
            <MenuItem value={index}>{unit.fullName}</MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {errors.faculty ? errors.faculty.message : "Ваш факультет"}
        </FormHelperText>
      </FormControl>
      <TextField
        color="success"
        type={isSecured ? "password" : "text"}
        id="password-basic"
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : "Ваш пароль"}
        label="Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleSecured}
                onMouseDown={toggleSecured}
                edge="end"
              >
                {isSecured ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        {...register("password", {
          required: { value: true, message: "Поле обязательно" },
          pattern: {
            value: /^[a-zA-Z0-9]{8,16}$/,
            message:
              "Пароль должен содержать от 8 до 16 символов (латиница или цифры)",
          },
        })}
      />

      <TextField
        color="success"
        type={isSecured ? "password" : "text"}
        id="repeatPassword-basic"
        error={!!errors.repeatPassword}
        helperText={
          errors.repeatPassword
            ? errors.repeatPassword.message
            : "Повторите пароль"
        }
        label="Repeat password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleSecured}
                onMouseDown={toggleSecured}
                edge="end"
              >
                {isSecured ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        {...register("repeatPassword", {
          required: { value: true, message: "Поле обязательно" },
          pattern: {
            value: /^[a-zA-Z0-9]{8,16}$/,
            message:
              "Пароль должен содержать от 8 до 16 символов (латиница или цифры)",
          },
        })}
      />

      <Button
        color="success"
        variant="contained"
        type="button"
        disabled={isLoading}
        onClick={handleSubmit(handleFormSubmit)}
      >
        <div className="signUpLoader">{isLoading && <SpinLoaderLight />}</div>
        Зарегестрироваться
      </Button>

      <p className="signUpDescription">или</p>

      <Button
        color="success"
        variant="contained"
        type="button"
        disabled={isLoading}
        onClick={handleGoSignIn}
      >
        Войти в уже сущесвующий аккаунт
      </Button>

      {!!errorMessage.length && (
        <AlertWindow
          toggleClose={handleClearErrorMessage}
          message={errorMessage}
        />
      )}
    </form>
  );
};
