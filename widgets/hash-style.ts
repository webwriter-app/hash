import {css} from "lit";
export const style = css`

  #container{
      position: relative;
      height: 50vh;
      border-width: 2px;
    border-style: solid;
    border-radius: 5px;
    border-color: #6a6a6a;
  }
  #context,
  #draggable {
      position: absolute;
      border: 5px solid #fff;
      outline: 10px solid #fff; 
      border-radius: 10px;
      padding: 5px;
      box-shadow: 10px 10px 25px 10px #00466666;
      background-color: #fff;
    }
  #context{
    display: none;
    flex-direction: column;
    outline: 4px solid #fff;
    box-shadow: 8px 8px 20px 2px #00466666;
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
