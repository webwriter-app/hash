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

	@property({ attribute: false })
	private accessor connections: HTMLDivElement[][] = [];

	@property({ attribute: false })
	private accessor conBuffer: HTMLDivElement = null;

	@property({ attribute: false })
	private accessor curHash: string = "";

	@property({ attribute: false })
	private accessor useSalt: boolean = false;

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
			"sl-divider": SlDivider
		};
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		this.addEventListener("contextmenu", (e) => {
			this.context.style.top = e.offsetY + "px";
			this.context.style.left = e.offsetX + "px";
			this.context.style.display =
				this.context.style.display === "flex" ? "" : "flex";
		});
	}

	private toHex(bytes): string {
		return Array.from(bytes || [])
			.map((b) => this.hex_string[b >> 4] + this.hex_string[b & 15])
			.join("");
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

	private spawnDiv(type: string, x: number, y: number): void {
		let node: HTMLDivElement = this.shadowRoot.createElement(
			"div"
		) as HTMLDivElement;
		node.id = "draggable";
		node.setAttribute("type", type);
		node.setAttribute(
			"identifier",
			Math.floor(Date.now() / 1000).toString()
		);
		node.style.top = y + "px";
		node.style.left = x + "px";
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
			node.remove();
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
				this.changedInput(node, text.value);
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
			text.value != "" ? this.changedInput(node, text.value) : "";
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
		};
		let saltCheck: SlIconButton = this.shadowRoot.createElement(
			"sl-icon-button"
		) as SlIconButton;
		saltCheck.id = "saltCheck";
		saltCheck.src = salt_svg;
		saltCheck.onclick = (e) => {
			console.log(flexDiv2.style.display);
			if (
				flexDiv2.style.display === "none" ||
				flexDiv2.style.display === ""
			) {
				flexDiv2.style.display = "flex";
				this.useSalt = true;
				saltCheck.style.color = "#2594c9";
				if (saltText.value === "") {
					saltText.value = this.toHex(randomBytes(32));
				}
			} else {
				flexDiv2.style.display = "none";
				this.useSalt = false;
				saltCheck.style.color = "";
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
	}
	private changedInput(node: HTMLDivElement, value: string) {
		console.log(this.connections, node);
		this.connections.forEach((con) => {
			if (
				con[0].getAttribute("identifier") ===
				node.getAttribute("identifier")
			) {
				(
					con[1].getElementsByTagName("sl-textarea")[0] as SlTextarea
				).value =
					value != ""
						? this.toHex(this.allHashes[this.curHash](value))
						: "";
			} else if (
				con[1].getAttribute("identifier") ===
				node.getAttribute("identifier")
			) {
				(
					con[0].getElementsByTagName("sl-textarea")[0] as SlTextarea
				).value =
					value != ""
						? this.toHex(this.allHashes[this.curHash](value))
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
		});
		node.remove();
		console.log(this.connections);
	}
	establishCon(node: HTMLDivElement) {
		if (this.conBuffer === null) {
			this.conBuffer = node;
		} else {
			if (
				this.conBuffer != node &&
				this.conBuffer.getAttribute("type") != node.getAttribute("type")
			) {
				this.connections.push([this.conBuffer, node]);
				let stopLineDrwawing = this.drawCon(
					this.conBuffer,
					node,
					this.container,
					this.getBoundingClientRect()
				);

				let text1: string =
					this.conBuffer.getElementsByTagName("sl-textarea")[0].value;
				let text2: string =
					node.getElementsByTagName("sl-textarea")[0].value;

				if (node.getAttribute("type") === "input") {
					this.changedInput(node, text2);
				} else if (this.conBuffer.getAttribute("type") === "input") {
					this.changedInput(this.conBuffer, text1);
				}
			}
			this.conBuffer = null;
		}
	}

	private drawCon(
		div1: HTMLDivElement,
		div2: HTMLDivElement,
		container: HTMLDivElement,
		parentDims: DOMRect
	): () => void {
		let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.style.position = "relative";
		svg.style.pointerEvents = "none";
		svg.style.zIndex = "-1";
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
		console.log(
			parentDims,
			div1.getBoundingClientRect(),
			div2.getBoundingClientRect()
		);
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
					? rect1.right - parentDims.left - rect1.width * 1.1
					: rect1.left - parentDims.left - rect1.width * 1.05
				: rect1.left - parentDims.left - rect1.width / 2;

			let y1 = horizontal
				? rect1.top - parentDims.top + rect1.height / 2
				: center1.y < center2.y
				? rect1.bottom - parentDims.top - 15
				: rect1.top - parentDims.top - 15;

			let x2 = horizontal
				? center1.x < center2.x
					? rect2.left - parentDims.left - rect2.width * 1.1
					: rect2.right - parentDims.left - rect2.width * 1.15
				: rect2.left - parentDims.left - rect2.width / 2;

			let y2 = horizontal
				? rect2.top - parentDims.top + rect2.height / 2
				: center1.y < center2.y
				? rect2.top - parentDims.top - 15
				: rect2.bottom - parentDims.top - 15;

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

	private dragElement(elmnt) {
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
		}

		function closeDragElement() {
			document.onmouseup = null;
			document.onmousemove = null;
		}
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
									e.screenX - e.offsetX,
									e.screenY - e.offsetY
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
									e.screenX - e.offsetX,
									e.screenY - e.offsetY
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
