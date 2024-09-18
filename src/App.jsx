import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { RecoilRoot } from "recoil";

import SeoulHome from "./routes/Seoul/SeoulHome";
import SeoulMainScreen from "./routes/Seoul/SeoulMainScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SeoulHome />,
  },
  {
    path: "/yonggang",
    element: <SeoulHome />,
  },
  {
    path: "/multi-glosses",
    element: <SeoulMainScreen />,
  },
]);

const GlobalStyle = createGlobalStyle`
  ${reset};
  body{
    background-color: white;
    font-family: Malgun "Franklin Gothic", sans-serif
  }
  *{
    cursor: default;
    user-select: none;
  }
`;

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
