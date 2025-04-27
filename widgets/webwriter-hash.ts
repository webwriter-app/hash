import { html, PropertyValues } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property, query } from "lit/decorators.js";
import * as sha2 from "@noble/hashes/sha2";
import * as sha3 from "@noble/hashes/sha3";
import { sha1 } from "@noble/hashes/sha1";
import * as sha3a from "@noble/hashes/sha3-addons";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { blake3 } from "@noble/hashes/blake3";
import { blake2b } from "@noble/hashes/blake2b";
import { blake2s } from "@noble/hashes/blake2s";
import { hmac } from "@noble/hashes/hmac";
import { hkdf } from "@noble/hashes/hkdf";
import * as pbkdf2 from "@noble/hashes/pbkdf2";
import * as scrypt from "@noble/hashes/scrypt";
import { randomBytes } from "@noble/hashes/utils";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.component.js";
import SlOption from "@shoelace-style/shoelace/dist/components/option/option.component.js";
import SlCheckbox from "@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js";
import SlIconButton from "@shoelace-style/shoelace/dist/components/icon-button/icon-button.component.js";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.component.js";
import SlDivider from "@shoelace-style/shoelace/dist/components/divider/divider.component.js";

import "@shoelace-style/shoelace/dist/themes/light.css";
import { style } from "./hash-style";

import output_svg from "./material-symbols--text-compare-rounded.svg";
import input_svg from "./material-symbols--code-blocks-outline-rounded.svg";
import salt_svg from "./f7--text-append.svg";
import trash_svg from "./mdi--trash-outline.svg";
import link_svg from "./mingcute--link-line.svg";

@customElement("webwriter-hash")
export class WebwriterHash extends LitElementWw {
	static styles = style;

	@query("#container")
	private accessor container: HTMLDivElement;

	@query("#context")
	private accessor context: HTMLDivElement;

	@property({
		attribute: true,
		type: Object,
		reflect: true,
		converter: {
			toAttribute(value) {
				return value != null ? JSON.stringify(value) : null;
			},
			fromAttribute(value) {
				try {
					return value ? JSON.parse(value) : null;
				} catch (e) {
					console.error("Failed to parse attribute value:", value, e);
					return null;
				}
			},
		},
	})
	private accessor elems: object = {};
	@property({
		attribute: true,
		type: Object,
		reflect: true,
		converter: {
			toAttribute(value) {
				return value != null ? JSON.stringify(value) : null;
			},
			fromAttribute(value) {
				try {
					return value ? JSON.parse(value) : null;
				} catch (e) {
					console.error("Failed to parse attribute value:", value, e);
					return null;
				}
			},
		},
	})
	private accessor cons: object = {};

	@property({ attribute: false })
	private accessor connections: HTMLDivElement[][] = [];

	@property({ attribute: false })
	private accessor conBuffer: HTMLDivElement = null;

	@property({ attribute: false })
	private accessor curHash: string = "";

	@property({ attribute: false })
	private accessor mousePos: [number, number] = [0, 0];

	private drawObject = null;
	private currConSelect: SlIconButton = null;
	private hex_string: string = "0123456789abcdef";
	private allHashes = Object.assign(
		sha2,
		sha1,
		sha3,
		sha3a,
		ripemd160,
		blake3,
		blake2b,
		blake2s,
		hmac,
		hkdf,
		pbkdf2,
		scrypt
	);

	static get scopedElements() {
		return {
			"sl-textarea": SlTextarea,
			"sl-button": SlButton,
			"sl-select": SlSelect,
			"sl-option": SlOption,
			"sl-input": SlInput,
			"sl-checkbox": SlCheckbox,
			"sl-icon-button": SlIconButton,
			"sl-divider": SlDivider,
		};
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		this.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			this.context.style.top = e.offsetY + "px";
			this.context.style.left = e.offsetX + "px";
			this.context.style.display =
				this.context.style.display === "flex" ? "" : "flex";
		});

		this.addEventListener("click", (e) => {
			this.context.style.display = "";
		});

		this.addEventListener("mousemove", (e) => {
			this.mousePos[0] = e.offsetX;
			this.mousePos[1] = e.offsetY;
		});

		Object.keys(this.elems).forEach((key) => {
			let object = this.spawnDiv(
				this.elems[key].type,
				this.elems[key].x,
				this.elems[key].y,
				false
			);
			if(object.getAttribute("type") === "input"){
				object.getElementsByTagName("sl-select")[0].value = this.elems[key].hash
			}
			object.getElementsByTagName("sl-textarea")[0].value = this.elems[key].text != undefined ? this.elems[key].text : "" 
			object.setAttribute("identifier", key)
		});

		Object.keys(this.cons).forEach((key)=>{
			let object1: HTMLDivElement
			let object2: HTMLDivElement

			for (let element of this.container.getElementsByTagName("div")){
				if(element.getAttribute("identifier") === key){
					object1 = element as HTMLDivElement
				}
				if(element.getAttribute("identifier") === this.cons[key]){
					object2 = element as HTMLDivElement
				}
			}

			if(object1.getAttribute("type") === "input"){
				this.curHash = object1.getElementsByTagName("sl-select")[0].value
			}else{
				this.curHash = object2.getElementsByTagName("sl-select")[0].value
			}
			this.establishCon(object1, false, true, object2)
		})
	}

	private toHex(bytes): string {
		return Array.from(bytes || [])
			.map((b) => this.hex_string[b >> 4] + this.hex_string[b & 15])
			.join("");
	}

	private updateElems(path, value, options = {}) {
		const parts = Array.isArray(path) ? path : path.split(".");
		let data = { ...this.elems };

		if (options.delete || (value === undefined && !options.rename)) {
			if (parts.length === 1) {
				delete data[parts[0]];
			} else {
				let current = data;
				for (let i = 0; i < parts.length - 1; i++) {
					const part = parts[i];
					current[part] = { ...(current[part] ?? {}) };
					current = current[part];
				}
				delete current[parts[parts.length - 1]];
			}
			this.elems = data;
			return;
		}

		if (options.rename) {
			const fromKey = parts[0];
			const toKey = options.rename;

			if (data.hasOwnProperty(fromKey)) {
				data[toKey] = data[fromKey];
				delete data[fromKey];
				this.elems = data;
				return;
			} else {
				console.warn(`Key "${fromKey}" not found, cannot rename.`);
				return;
			}
		}

		let current = data;
		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			current[part] = { ...(current[part] ?? {}) };
			current = current[part];
		}

		const lastKey = parts[parts.length - 1];
		current[lastKey] = value;

		this.elems = data;
	}

	private updateCons(path, value, options = {}) {
		const parts = Array.isArray(path) ? path : path.split(".");
		let data = { ...this.cons };

		if (options.delete || (value === undefined && !options.rename)) {
			if (parts.length === 1) {
				delete data[parts[0]];
			} else {
				let current = data;
				for (let i = 0; i < parts.length - 1; i++) {
					const part = parts[i];
					current[part] = { ...(current[part] ?? {}) };
					current = current[part];
				}
				delete current[parts[parts.length - 1]];
			}
			this.cons = data;
			return;
		}

		if (options.rename) {
			const fromKey = parts[0];
			const toKey = options.rename;

			if (data.hasOwnProperty(fromKey)) {
				data[toKey] = data[fromKey];
				delete data[fromKey];
				this.cons = data;
				return;
			} else {
				console.warn(`Key "${fromKey}" not found, cannot rename.`);
				return;
			}
		}

		let current = data;
		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			current[part] = { ...(current[part] ?? {}) };
			current = current[part];
		}

		const lastKey = parts[parts.length - 1];
		current[lastKey] = value;

		this.cons = data;
	}

	private fillOptions(element: SlSelect): void {
		let keys = Object.keys(this.allHashes);
		keys.forEach((key) => {
			let option: SlOption = this.shadowRoot.createElement(
				"sl-option"
			) as SlOption;
			option.value = key;
			option.innerText = key;
			element.appendChild(option);
		});
	}

	private spawnDiv(
		type: string,
		x: number,
		y: number,
		addToElems?
	): HTMLDivElement {
		let node: HTMLDivElement = this.shadowRoot.createElement(
			"div"
		) as HTMLDivElement;
		node.id = "draggable";
		node.setAttribute("type", type);
		node.setAttribute(
			"identifier",
			Math.floor(Date.now() / 1000).toString()
		);
		node.setAttribute("useSalt", "false");
		node.style.top = y + "px";
		node.style.left = x + "px";
		node.style.zIndex = "5";
		let header: HTMLDivElement = this.shadowRoot.createElement(
			"div"
		) as HTMLDivElement;
		header.id = "header";
		header.style.display = "flex";
		header.style.flexDirection = "row";
		let title: HTMLParagraphElement = this.shadowRoot.createElement(
			"b"
		) as HTMLParagraphElement;
		title.innerHTML = type;
		let remButton: SlIconButton = this.shadowRoot.createElement(
			"sl-icon-button"
		) as SlIconButton;
		remButton.src = trash_svg;
		remButton.onclick = (e) => {
			this.updateElems(node.getAttribute("identifier"), undefined);
			this.removeNode(node);
		};
		let conButton: SlIconButton = this.shadowRoot.createElement(
			"sl-icon-button"
		) as SlIconButton;
		conButton.src = link_svg;
		conButton.onclick = (e) => {
			this.establishCon(node);
			if (this.conBuffer != null) {
				this.currConSelect = conButton;
				this.currConSelect.style.color = "#2594c9";
			} else {
				this.currConSelect.style.color = "";
			}
		};
		header.appendChild(title);
		header.appendChild(remButton);
		header.appendChild(conButton);
		let text: SlTextarea = this.shadowRoot.createElement(
			"sl-textarea"
		) as SlTextarea;
		text.id = "text";
		text.oninput = (e) => {
			if (!text.disabled) {
				if (this.curHash != select.value) {
					this.curHash = select.value;
				}
				this.changedInput(node, text.value);
				this.updateElems(
					`${node.getAttribute("identifier")}.text`,
					text.value
				);
			}
		};
		text.onmousedown = (e) => e.stopPropagation();
		let flexDiv: HTMLDivElement = this.shadowRoot.createElement(
			"div"
		) as HTMLDivElement;
		flexDiv.id = "flexDiv";
		let select: SlSelect = this.shadowRoot.createElement(
			"sl-select"
		) as SlSelect;
		this.fillOptions(select);
		select.id = "hashSelect";
		select.placeholder = "select hash";
		select.size = "small";
		select.addEventListener("sl-change", (e) => {
			this.curHash = select.value;
			this.updateElems(
				`${node.getAttribute("identifier")}.hash`,
				select.value
			);
			if (node.getAttribute("useSalt") === "true") {
				this.changedInput(node, text.value, saltText.value);
			} else {
				text.value != "" ? this.changedInput(node, text.value) : "";
			}
		});
		setTimeout(() => {
			select.shadowRoot.getElementById("listbox").style.height = "175px";
		});
		let flexDiv2: HTMLDivElement = this.shadowRoot.createElement(
			"div"
		) as HTMLDivElement;
		flexDiv2.id = "flexDiv2";
		let saltText: SlInput = this.shadowRoot.createElement(
			"sl-input"
		) as SlInput;
		saltText.id = "saltText";
		saltText.disabled = true;
		saltText.size = "small";
		let reloadSalt: SlButton = this.shadowRoot.createElement(
			"sl-button"
		) as SlButton;
		reloadSalt.innerText = "↻";
		reloadSalt.size = "small";
		reloadSalt.onclick = (e) => {
			saltText.value = this.toHex(randomBytes(32));
			if (this.curHash != select.value) {
				this.curHash = select.value;
			}
			this.changedInput(node, text.value, saltText.value);
		};
		let saltCheck: SlIconButton = this.shadowRoot.createElement(
			"sl-icon-button"
		) as SlIconButton;
		saltCheck.id = "saltCheck";
		saltCheck.src = salt_svg;
		saltCheck.onclick = (e) => {
			if (this.curHash != select.value) {
				this.curHash = select.value;
			}
			if (
				flexDiv2.style.display === "none" ||
				flexDiv2.style.display === ""
			) {
				flexDiv2.style.display = "flex";
				saltText.value = this.toHex(randomBytes(32));
				node.setAttribute("useSalt", "true");
				this.changedInput(node, text.value, saltText.value);
			} else {
				flexDiv2.style.display = "none";
				saltCheck.style.color = "";
				node.setAttribute("useSalt", "false");
				this.changedInput(node, text.value);
			}
		};
		if (type === "output") {
			text.disabled = true;
			select.style.display = "none";
			flexDiv.style.display = "none";
			saltCheck.style.display = "none";
		}
		if (type === "input") {
			select.style.display = "";
			flexDiv.style.display = "flex";
			saltCheck.style.display = "";
		}
		flexDiv.appendChild(select);
		flexDiv.appendChild(saltCheck);
		flexDiv2.appendChild(saltText);
		flexDiv2.appendChild(reloadSalt);
		node.appendChild(header);
		node.appendChild(flexDiv);
		node.appendChild(flexDiv2);
		node.appendChild(text);
		this.container.appendChild(node);
		this.dragElement(node);

		if (addToElems != false) {
			this.updateElems(
				`${node.getAttribute("identifier")}.x`,
				node.getBoundingClientRect().x
			);
			this.updateElems(
				`${node.getAttribute("identifier")}.y`,
				node.getBoundingClientRect().y
			);
			this.updateElems(
				`${node.getAttribute("identifier")}.type`,
				node.getAttribute("type")
			);
		}

		return node;
	}
	private changedInput(
		node: HTMLDivElement,
		value: string,
		saltValue?: string
	) {
		this.connections.forEach((con) => {
			if (
				con[0].getAttribute("identifier") ===
				node.getAttribute("identifier")
			) {
				(
					con[1].getElementsByTagName("sl-textarea")[0] as SlTextarea
				).value =
					value != ""
						? this.toHex(
								this.allHashes[this.curHash](
									saltValue != undefined
										? String.prototype.concat(
												value,
												saltValue
										  )
										: value
								)
						  )
						: "";
			} else if (
				con[1].getAttribute("identifier") ===
				node.getAttribute("identifier")
			) {
				(
					con[0].getElementsByTagName("sl-textarea")[0] as SlTextarea
				).value =
					value != ""
						? this.toHex(
								this.allHashes[this.curHash](
									saltValue != undefined
										? String.prototype.concat(
												value,
												saltValue
										  )
										: value
								)
						  )
						: "";
			}
		});
	}

	private removeNode(node: HTMLDivElement) {
		let removeIndices: number[] = [];
		this.connections.forEach((arr) => {
			if (arr.includes(node)) {
				removeIndices.push(this.connections.indexOf(arr));
			}
		});
		removeIndices.forEach((index) => {
			this.connections.splice(index, 1);
			let remKey = ""
			Object.keys(this.cons).forEach((key)=>{
				if(key === node.getAttribute("identifier") || this.cons[key] === node.getAttribute("identifier")){
					remKey = key
				}
			})
			this.updateCons(remKey, undefined)
		});
		node.remove();
	}
	establishCon(node: HTMLDivElement, addToCons = true, existing?: boolean, partner?: HTMLDivElement) {
		console.log("ENTER", node, partner)
		if (this.conBuffer === null && existing != true) {
			this.conBuffer = node;
			this.drawObject = this.createMouseLineDrawer(
				this.mousePos[0],
				this.mousePos[1],
				this,
				this.getBoundingClientRect()
			);
			this.drawObject.toggle();
		} else {
			let noPriorCon = true;
			this.connections.forEach((con) => {
				if (
					(con[0] === node && con[1] === this.conBuffer) ||
					(con[1] === node && con[0] === this.conBuffer)
				) {
					noPriorCon = false;
				}
			});
			if(existing){
				this.conBuffer = partner
			}
			if (
				this.conBuffer != node &&
				this.conBuffer.getAttribute("type") !=
					node.getAttribute("type") &&
				noPriorCon
			) {
				this.connections.push([this.conBuffer, node]);
				if(addToCons){
					this.updateCons(node.getAttribute("identifier"), this.conBuffer.getAttribute("identifier"))
				}
				let stopLineDrwawing = this.drawCon(
					this.conBuffer,
					node,
					this.container,
					this.container.getBoundingClientRect()
				);

				let text1: string =
					this.conBuffer.getElementsByTagName("sl-textarea")[0].value;
				let text2: string =
					node.getElementsByTagName("sl-textarea")[0].value;

				if (node.getAttribute("type") === "input") {
					if (node.getAttribute("useSalt") === "true") {
						let saltText: string =
							node.getElementsByTagName("sl-input")[0].value;
						this.changedInput(node, text2, saltText);
					} else {
						this.changedInput(node, text2);
					}
				} else if (this.conBuffer.getAttribute("type") === "input") {
					if (this.conBuffer.getAttribute("useSalt") === "true") {
						let saltText: string =
							this.conBuffer.getElementsByTagName("sl-input")[0]
								.value;
						this.changedInput(this.conBuffer, text1, saltText);
					} else {
						this.changedInput(this.conBuffer, text1);
					}
				}
			}
			this.conBuffer = null;
			if(existing != true){
				this.drawObject.toggle();
				this.drawObject.destroy();
			}
			this.drawObject = null;	
			console.log(this.connections)
		}
	}

	private drawCon(
		div1: HTMLDivElement,
		div2: HTMLDivElement,
		container: HTMLDivElement,
		parentDims: DOMRect
	): () => void {
		let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.style.position = "sticky";
		svg.style.pointerEvents = "none";
		svg.style.zIndex = (
			Math.min(
				Number.parseInt(div1.style.zIndex),
				Number.parseInt(div2.style.zIndex)
			) - 1
		).toString();
		svg.style.overflow = "visible";
		svg.setAttribute("width", "10");
		svg.setAttribute("height", "10");

		let defs = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"defs"
		);
		let filter = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"filter"
		);
		filter.setAttribute("id", "curve-shadow");
		filter.setAttribute("x", "-50%");
		filter.setAttribute("y", "-50%");
		filter.setAttribute("width", "200%");
		filter.setAttribute("height", "200%");

		let dropShadow = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"feDropShadow"
		);
		dropShadow.setAttribute("dx", "5");
		dropShadow.setAttribute("dy", "10");
		dropShadow.setAttribute("stdDeviation", "3");
		dropShadow.setAttribute("flood-color", "#00466666");

		filter.appendChild(dropShadow);
		defs.appendChild(filter);
		svg.appendChild(defs);

		let path = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"path"
		);
		path.setAttribute("stroke", "#2594c9");
		path.setAttribute("stroke-width", "2");
		path.setAttribute("fill", "none");
		svg.appendChild(path);
		path.setAttribute("filter", "url(#curve-shadow)");
		container.appendChild(svg);

		let animationFrameId: number;
		function updatePath() {
			if (!container.contains(div1) || !container.contains(div2)) {
				cleanup();
				return;
			}

			let rect1 = div1.getBoundingClientRect();
			let rect2 = div2.getBoundingClientRect();

			let center1 = {
				x: rect1.left - parentDims.left - rect1.width / 2,
				y: rect1.top - parentDims.top - rect1.height / 2,
			};

			let center2 = {
				x: rect2.left - parentDims.left - rect2.width / 2,
				y: rect2.top - parentDims.top - rect2.height / 2,
			};

			let horizontal =
				Math.abs(center1.x - center2.x) >
				Math.abs(center1.y - center2.y);

			let x1 = horizontal
				? center1.x < center2.x
					? div1.offsetLeft + rect1.width
					: div1.offsetLeft
				: div1.offsetLeft;

			let y1 = horizontal
				? div1.offsetTop
				: center1.y < center2.y
				? div1.offsetTop + rect1.height
				: div1.offsetTop;

			let x2 = horizontal
				? center1.x < center2.x
					? div2.offsetLeft
					: div2.offsetLeft + rect2.width
				: div2.offsetLeft;

			let y2 = horizontal
				? div2.offsetTop
				: center1.y < center2.y
				? div2.offsetTop + rect2.height
				: div2.offsetTop;

			let curveOffset = 75;

			let cp1x = horizontal ? x1 + curveOffset * (x1 < x2 ? 1 : -1) : x1;
			let cp1y = horizontal ? y1 : y1 + curveOffset * (y1 < y2 ? 1 : -1);

			let cp2x = horizontal ? x2 - curveOffset * (x1 < x2 ? 1 : -1) : x2;
			let cp2y = horizontal ? y2 : y2 - curveOffset * (y1 < y2 ? 1 : -1);

			let pathData = `M ${x1},${y1} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
			path.setAttribute("d", pathData);
			path.style.transition = "d 50ms ease";

			animationFrameId = requestAnimationFrame(updatePath);
		}

		function cleanup() {
			cancelAnimationFrame(animationFrameId);
			svg.remove();
			observer.disconnect();
		}

		let observer = new MutationObserver(() => {
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

	private dragElement(elmnt, parent = this) {
		var pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0;
		elmnt.onmousedown = dragMouseDown;

		function dragMouseDown(e) {
			e = e || window.event;

			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;

			document.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();

			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;

			elmnt.style.top = elmnt.offsetTop - pos2 + "px";
			elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
			parent.updateElems(`${elmnt.getAttribute("identifier")}.x`, elmnt.offsetLeft - pos1)
			parent.updateElems(`${elmnt.getAttribute("identifier")}.y`, elmnt.offsetTop - pos2)
		}

		function closeDragElement() {
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}

	private createMouseLineDrawer(
		fixedX: number,
		fixedY: number,
		parent: WebwriterHash,
		parentRect: DOMRect
	) {
		const fixedPoint = { x: fixedX, y: fixedY };

		let svg: SVGSVGElement | null = null;
		let line: SVGLineElement | null = null;
		let isDrawing = false;
		let animationFrameId: number | null = null;

		function setupSVG() {
			svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute(
				"style",
				`
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			pointer-events: none;
			z-index: 9999;
		  `
			);
			svg.setAttribute("width", "100%");
			svg.setAttribute("height", "100%");

			line = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"line"
			);
			line.setAttribute("x1", fixedPoint.x.toString());
			line.setAttribute("y1", fixedPoint.y.toString());
			line.setAttribute("x2", fixedPoint.x.toString());
			line.setAttribute("y2", fixedPoint.y.toString());
			line.setAttribute("stroke", "darkgrey");
			line.setAttribute("stroke-opacity", "0.5");
			line.setAttribute("stroke-linecap", "butt");
			line.setAttribute("stroke-dasharray", "35,10");
			line.setAttribute("stroke-width", "2");

			svg.appendChild(line);
			parent.container.appendChild(svg);
		}

		function updateLine() {
			if (line) {
				line.setAttribute("x2", parent.mousePos[0].toString());
				line.setAttribute("y2", parent.mousePos[1].toString());
			}
		}

		function drawLoop() {
			if (!isDrawing) return;
			updateLine();
			animationFrameId = requestAnimationFrame(drawLoop);
		}

		function start() {
			if (!svg) setupSVG();
			isDrawing = true;
			drawLoop();
		}

		function stop() {
			isDrawing = false;
			if (animationFrameId !== null) {
				cancelAnimationFrame(animationFrameId);
			}
			if (line) {
				line.setAttribute("x2", fixedPoint.x.toString());
				line.setAttribute("y2", fixedPoint.y.toString());
			}
		}

		function destroy() {
			stop();
			svg?.remove();
			svg = null;
			line = null;
		}

		function toggle() {
			isDrawing ? stop() : start();
		}

		return {
			toggle,
			stop,
			destroy,
		};
	}

	render() {
		return html`
			<div id="container">
				<div id="context">
					<div
						style="display: flex; flex-direction: row; align-items: center"
					>
						<sl-icon-button
							src=${input_svg}
							@click=${(e) => {
								this.spawnDiv(
									"input",
									this.mousePos[0],
									this.mousePos[1]
								);
								this.context.style.display = "none";
							}}
							>spawn input</sl-icon-button
						>
						<b style="font-size: 10pt; font-weight: 500">input</b>
					</div>
					<sl-divider></sl-divider>
					<div
						style="display: flex; flex-direction: row; align-items: center"
					>
						<sl-icon-button
							src=${output_svg}
							@click=${(e) => {
								this.spawnDiv(
									"output",
									this.mousePos[0],
									this.mousePos[1]
								);
								this.context.style.display = "none";
							}}
							>spawn output</sl-icon-button
						>
						<b style="font-size: 10pt; font-weight: 500">output</b>
					</div>
				</div>
			</div>
		`;
	}
}
