export interface StateConfig {
  name?: string;
  onEnter?: () => void;
  onUpdate?: (dt: number) => void;
  onExit?: () => void;
}

export default class StateMachine {
  context?: any;
  name?: string;
  states = new Map<string, StateConfig>();
  currentState?: StateConfig;
  private isSwitchingState = false;
  private stateQueue: string[] = [];
  constructor(context?: any, name?: string) {
    this.context = context;
    this.name = name || "fsm";
  }
  isCurrrentState(name: string) {
    if (!this.currentState) {
      return false;
    }
    return this.currentState.name === name;
  }

  addState(name: string, config?: StateConfig) {
    this.states.set(name, {
      name,
      onEnter: config?.onEnter?.bind(this.context),
      onUpdate: config?.onUpdate?.bind(this.context),
    });
  }
  setState(name: string) {
    if (!this.states.has(name)) {
      return;
    }
    if (this.isSwitchingState) {
      this.stateQueue.push.name;
      return;
    }
    this.isSwitchingState = true;
    if (this.currentState && this.currentState.onExit) {
      this.currentState.onExit();
    }
    this.currentState = this.states.get(name)!;
    if (this.currentState.onEnter) {
      this.currentState.onEnter();
    }
    this.isSwitchingState = false;
    return this;
  }
  update(dt: number) {
    if (this.stateQueue.length > 0) {
      const name = this.stateQueue.shift()!;
      this.setState(name);
    }
    if (!this.currentState) {
      return;
    }
    if (this.currentState.onUpdate) {
      this.currentState.onUpdate(dt);
    }
  }
}
