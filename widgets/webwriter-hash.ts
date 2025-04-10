import {html, css, PropertyValues} from "lit"
import {LitElementWw} from "@webwriter/lit"
import {customElement, property, query} from "lit/decorators.js"
import * as sha2 from '@noble/hashes/sha2';
import * as sha3 from '@noble/hashes/sha3';
import { sha1 } from '@noble/hashes/sha1';
import * as sha3a from '@noble/hashes/sha3-addons';
import { ripemd160 } from '@noble/hashes/ripemd160';
import { blake3 } from '@noble/hashes/blake3';
import { blake2b } from '@noble/hashes/blake2b';
import { blake2s } from '@noble/hashes/blake2s';
import { hmac } from '@noble/hashes/hmac';
import { hkdf } from '@noble/hashes/hkdf';
import * as pbkdf2 from '@noble/hashes/pbkdf2';
import * as scrypt from '@noble/hashes/scrypt';
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.component.js";
import SlOption from "@shoelace-style/shoelace/dist/components/option/option.component.js";

/* Optional LOCALIZATION: Uncomment this after first running `npm run localize` in the command line.
import LOCALIZE from '../localization/generated'
import {msg} from '@lit/localize'
*/

@customElement("webwriter-hash")
export class WebwriterHash extends LitElementWw {


  @query("#container")
  private accessor container: HTMLDivElement

  @property({attribute:false})
  private accessor hex_string: string = "0123456789abcdef"

  @property({attribute: false})
  private accessor connections: HTMLDivElement[][] = []

  @property({attribute: false})
  private accessor conBuffer: HTMLDivElement = null

  @property({attribute: false})
  private accessor curHash: string = ""

  private allHashes = Object.assign(sha2, sha1, sha3, sha3a, ripemd160, blake3, blake2b, blake2s, hmac, hkdf, pbkdf2, scrypt)
  /* Optional LOCALIZATION: Uncomment this after first running `npm run localize` in the command line.
  localize = LOCALIZE
  */

  /** Register the classes of custom elements to use in the Shadow DOM here.
   * @example
   * import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js"
   * ...
   *   static scopedElements = {"sl-button": SlButton}
   **/
  static get scopedElements() {
    return {
      "sl-textarea": SlTextarea,
      "sl-button": SlButton,
      "sl-select": SlSelect,
      "sl-option": SlOption
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
}

private toHex(bytes): string {
  return Array.from(bytes || [])
    .map((b) => this.hex_string[b >> 4] + this.hex_string[b & 15])
    .join("");
}

private fillOptions(element: SlSelect): void{
  let keys = Object.keys(this.allHashes)
  keys.forEach(key => {
    let option: SlOption = this.shadowRoot.createElement("sl-option") as SlOption
    option.value = key
    option.innerText = key
    element.appendChild(option)
  });
}

private spawnDiv(type: string): void {
  let node: HTMLDivElement = this.shadowRoot.createElement("div") as HTMLDivElement
  node.id = "draggable"
  node.setAttribute("type", type)
  node.style.position = "absolute"
  node.style.border = "5px solid #fff"
  node.style.borderRadius = "10px"
  node.style.padding = "5px"
  node.style.boxShadow = "10px 10px 15px 5px #00466666"
  node.style.backgroundColor = "#fff"
  node.oncontextmenu = (e)=>{this.removeNode(node)}
  node.ondblclick = (e)=>{this.establishCon(node)}
  let header: HTMLParagraphElement = this.shadowRoot.createElement("b") as HTMLParagraphElement
  header.innerText = type
  header.style.fontSize = "12pt"
  header.style.width = "100%"
  let text: SlTextarea = this.shadowRoot.createElement("sl-textarea") as SlTextarea
  text.id="text"
  text.oninput = (e)=>{if(!text.disabled){this.changedInput(node, text.value)}}
  text.onmousedown = (e)=>e.stopPropagation()
  let select: SlSelect = this.shadowRoot.createElement("sl-select") as SlSelect
  this.fillOptions(select)
  select.size = "small"
  select.addEventListener("sl-change",(e)=>{this.curHash = select.value; text.value!=""?this.changedInput(node, text.value):""}) 
  setTimeout(()=>{select.shadowRoot.getElementById("listbox").style.height ="175px"})
  if(type === "output"){
    text.disabled = true
    // node.style.borderColor = "#ff9993"
    select.style.display = "none"
  }
  if(type === "input"){
    // node.style.borderColor = "#ae93cc"
    select.style.display = ""
  }
  node.appendChild(header)
  node.appendChild(select)
  node.appendChild(text)
  this.container.appendChild(node)
  this.dragElement(node)
}
  private changedInput(node: HTMLDivElement, value: string) {
    console.log(this.allHashes,this.curHash)
    this.connections.forEach(con =>{
      let index = con.indexOf(node)
      if(index != undefined){
        (con[(index+1)%2].getElementsByTagName("sl-textarea")[0] as SlTextarea).value = value!=""?this.toHex(this.allHashes[this.curHash](value)):""
      }
    })
  }

  private removeNode(node: HTMLDivElement) {
    let removeIndices: number[] = []
    this.connections.forEach(arr => {
      if(arr.includes(node)){
        removeIndices.push(this.connections.indexOf(arr))
      }
    });
    removeIndices.forEach(index => {
      this.connections.splice(index,1)
    });
    node.remove()
    console.log(this.connections)
  }
  establishCon(node: HTMLDivElement) {
    if(this.conBuffer === null){
      this.conBuffer = node
    }else {
      if(this.conBuffer != node && this.conBuffer.getAttribute("type") != node.getAttribute("type")){
        this.connections.push([this.conBuffer, node])
        const stopLineDrwawing = this.drawCon(this.conBuffer, node, this.container, this.getBoundingClientRect())
        //FIXME: auto apply hash
      }
      this.conBuffer = null
    }
  }

  private drawCon(
    div1: HTMLDivElement,
    div2: HTMLDivElement,
    container: HTMLDivElement,
    parentDims: DOMRect
  ): () => void {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.position = "relative";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "-1";
    svg.style.overflow = "visible";
    svg.setAttribute("width", "10");
    svg.setAttribute("height", "10");

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", "curve-shadow");
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");

    const dropShadow = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
    dropShadow.setAttribute("dx", "5");
    dropShadow.setAttribute("dy", "10");
    dropShadow.setAttribute("stdDeviation", "3");
    dropShadow.setAttribute("flood-color", "#00466666");

    filter.appendChild(dropShadow);
    defs.appendChild(filter);
    svg.appendChild(defs);

    
  
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "#2594c9");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    svg.appendChild(path);
    path.setAttribute("filter", "url(#curve-shadow)");
    container.appendChild(svg);

    let animationFrameId: number;
    console.log(parentDims, div1.getBoundingClientRect(), div2.getBoundingClientRect())
    function updatePath() {
      if (!container.contains(div1) || !container.contains(div2)) {
        cleanup();
        return;
      }
  
      const rect1 = div1.getBoundingClientRect();
      const rect2 = div2.getBoundingClientRect();
  
      const center1 = {
        x: rect1.left - parentDims.left - rect1.width / 2,
        y: rect1.top - parentDims.top - rect1.height / 2,
      };

      const center2 = {
        x: rect2.left - parentDims.left - rect2.width / 2,
        y: rect2.top - parentDims.top - rect2.height / 2,
      };

      const horizontal = Math.abs(center1.x - center2.x) > Math.abs(center1.y - center2.y);

      // Smart anchors for horizontal vs vertical
      const x1 = horizontal
        ? (center1.x < center2.x ? rect1.right - parentDims.left - rect1.width*1.1 : rect1.left - parentDims.left - rect1.width*1.05)
        : rect1.left - parentDims.left - rect1.width / 2;

      const y1 = horizontal
        ? rect1.top - parentDims.top + rect1.height/2
        : (center1.y < center2.y ? rect1.bottom - parentDims.top - 15: rect1.top - parentDims.top- 15);

      const x2 = horizontal
        ? (center1.x < center2.x ? rect2.left - parentDims.left - rect2.width*1.1 : rect2.right - parentDims.left - rect2.width * 1.15)
        : rect2.left - parentDims.left - rect2.width / 2;

      const y2 = horizontal
        ? rect2.top - parentDims.top + rect2.height/2
        : (center1.y < center2.y ? rect2.top - parentDims.top - 15 : rect2.bottom - parentDims.top - 15);

        const curveOffset = 75;

        const cp1x = horizontal ? x1 + curveOffset * (x1 < x2 ? 1 : -1) : x1;
        const cp1y = horizontal ? y1 : y1 + curveOffset * (y1 < y2 ? 1 : -1);
  
        const cp2x = horizontal ? x2 - curveOffset * (x1 < x2 ? 1 : -1) : x2;
        const cp2y = horizontal ? y2 : y2 - curveOffset * (y1 < y2 ? 1 : -1);
  
        const pathData = `M ${x1},${y1} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
        path.setAttribute("d", pathData);
        path.style.transition = "d 50ms ease";
  
      animationFrameId = requestAnimationFrame(updatePath);
    }
  
    function cleanup() {
      cancelAnimationFrame(animationFrameId);
      svg.remove();
      observer.disconnect();
    }
  
    const observer = new MutationObserver(() => {
      if (!container.contains(div1) || !container.contains(div2)) {
        cleanup();
      }
    });
  
    observer.observe(container, {
      childList: true,
      subtree: true,
    });
  
    updatePath();
  
    return cleanup;
  }
  
  


private dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

  /** Put the styles for your Shadow DOM (what is rendered through render()) here. */
  static styles = css`
  #container{
     position: relative;
     height: 100%
  }
  `

  /** Define your template here and return it. */
  render() {
    return html`
      
      <div id="container">

        <sl-button @click=${()=>{this.spawnDiv("input")}}>spawn input</sl-button>
        <sl-button @click=${()=>{this.spawnDiv("output")}}>spawn output</sl-button>
      </div>
      
      `
  }
}