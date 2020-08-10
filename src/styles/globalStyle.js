import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    
::-webkit-scrollbar {
  width: 7px;
}


::-webkit-scrollbar-track {
  background: #f1f1f1; 

}
 

::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius:8px

}


::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
  }
`