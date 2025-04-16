import {css} from "lit";
export const style = css`

  #container{
      position: relative;
      height: 100vh
  }
  #context,
  #draggable {
      position: absolute;
      border: 5px solid #fff;
      border-radius: 10px;
      padding: 5px;
      box-shadow: 10px 10px 15px 5px #00466666;
      background-color: #fff;
    }
  #context{
    display: none;
    flex-direction: column
    
  }
  #context *,
  #draggable * {
    padding: 2px
  }
  
  #header {
    font-size: 12pt;
    width: 100%;
  }

  #hashSelect {
    width: 200px
  }

  #saltCheck {
    font-size: 1.5rem;
    margin-top: -5px; 
  }
  
  #flexDiv {
    display: flex;
    flex-direction: row;
  }
  
  #flexDiv2 {
    display: none;
    flex-direction: row;
  }

  #saltText {
    width: 200px;
  }

  sl-divider {
    margin-block: 0
  }
`
