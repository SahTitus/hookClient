import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

body {
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#242526" : "white"};
  color:${(props) => (props.theme.mode === "dark" ? "white" : "")}
}

.app{
  background-color: ${(props) => (props.theme.mode === "dark" ? "#242526" : "")}
}

.app__body{
  background-color: ${(props) => (props.theme.mode === "dark" ? "#242526" : "")}
}

.appbar__header{
    background-color: ${(props) => (props.theme.mode === "dark" ? "#242526" : "")}
  }

.postCard{
    background-color: ${(props) => (props.theme.mode === "dark" ? "#000" : "")}
  }

`;

export default GlobalStyle;
