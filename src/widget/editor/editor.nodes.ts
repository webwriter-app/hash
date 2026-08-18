import { ClassicPreset, GetSchemes } from "rete";
import { computeHashHex } from "../hashing/hash";

const USE_COMPUTE_HASH_HEX = true;

// rete's Output defaults to multipleConnections: true, which has to be opted out of explicitly
const singleInput = (socket: ClassicPreset.Socket) => new ClassicPreset.Input(socket, undefined, false);
const singleOutput = (socket: ClassicPreset.Socket) => new ClassicPreset.Output(socket, undefined, false);

export class BaseNode extends ClassicPreset.Node {
    public customTitle: string = ""; 
    constructor(label: string) {
        super(label);
        this.customTitle = label;
    }
}

// node for user input
export class KeyNode extends BaseNode {
    public value = "";
    constructor(socket: ClassicPreset.Socket) {
        super("Key");
        this.addOutput("key-output", singleOutput(socket));
    }
    data() { return { "key-output": this.value }; }
}

// node for adding salt string
export class SaltNode extends BaseNode {
    public saltValue: string = "";
    public incomingValue: string = "";

    constructor(socket: ClassicPreset.Socket, initialSalt?: string) {
        super("Salt");

        // set initial salt / generate random 5-char string
        if (initialSalt !== undefined) {
            this.saltValue = initialSalt;
        } else {
            this.saltValue = Math.random().toString(36).substring(2, 7);
        }
        
        this.addInput("salt-input", singleInput(socket));
        this.addOutput("salt-output", singleOutput(socket));
    }

    regenerateSalt() {
        this.saltValue = Math.random().toString(36).substring(2, 7);
    }

    data(inputs: Record<string, any[]>) {
        const inputVal = inputs["salt-input"]?.[0];
        this.incomingValue = inputVal ? String(inputVal) : "";
        
        return { "salt-output": this.incomingValue + this.saltValue };
    }
}

// node that performs the hashing 
export class HashFunctionNode extends BaseNode {
    public selectedFunction = "sha256";
    public socket: ClassicPreset.Socket;

    constructor(socket: ClassicPreset.Socket) {
        super("HashFunction");
        this.socket = socket;
        this.addInput("in-0", singleInput(socket));
        this.addOutput("out-0", singleOutput(socket));
    }

    // adds and removes input/output pairs dynamically
    setChannelCount(count: number) {
        const currentCount = Object.keys(this.inputs).length;
        if (count > currentCount) {
            for (let i = currentCount; i < count; i++) {
                this.addInput(`in-${i}`, singleInput(this.socket));
                this.addOutput(`out-${i}`, singleOutput(this.socket));
            }
        }
        if (count < currentCount) {
            for (let i = currentCount - 1; i >= count; i--) {
                this.removeInput(`in-${i}`);
                this.removeOutput(`out-${i}`);
            }
        }
    }

    // executes the selected hash algorithm
    data(inputs: Record<string, any[]>) {
        const result: Record<string, string> = {};
    
        Object.keys(this.outputs).forEach((outKey) => {
          const index = outKey.split("-")[1];    
          const inKey = `in-${index}`;
    
          const inputValues = inputs[inKey] || [];
          const val = inputValues.length > 0 ? String(inputValues[0]) : "";
        
          if (USE_COMPUTE_HASH_HEX) {
            result[outKey] = computeHashHex(this.selectedFunction, val);
          } else {
            result[outKey] = "";
          }
        });
    
        return result;
    }
}

// node that displays the final hashed result
export class HashValueNode extends BaseNode {
    public displayValue = "";
    constructor(socket: ClassicPreset.Socket) {
        super("HashValue");
        this.addInput("hash-value-input", singleInput(socket));
    }
    data() { return {}; }
}

export type Nodes = KeyNode | HashFunctionNode | HashValueNode | SaltNode;

export class Connection extends ClassicPreset.Connection<Nodes, Nodes> {
    public color?: string; 
}

export type Schemes = GetSchemes<Nodes, Connection>;
