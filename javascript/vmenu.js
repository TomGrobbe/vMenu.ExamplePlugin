// vMenu Enhanced plugin API for JavaScript, built for vMenu Enhanced v0.0.0-local.
// Copy this file into your resource and load it before your own scripts, see https://docs.vespura.com/vmenu/enhanced/plugins/javascript/
"use strict";
var vMenu = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target2, all) => {
    for (var name in all)
      __defProp(target2, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/iife.ts
  var iife_exports = {};
  __export(iife_exports, {
    Gate: () => Gate,
    NotifyStyle: () => NotifyStyle,
    PluginBoolSetting: () => PluginBoolSetting,
    PluginButton: () => PluginButton,
    PluginCheckbox: () => PluginCheckbox,
    PluginConfirmButton: () => PluginConfirmButton,
    PluginConfirmList: () => PluginConfirmList,
    PluginDynamicList: () => PluginDynamicList,
    PluginFloatSetting: () => PluginFloatSetting,
    PluginIntSetting: () => PluginIntSetting,
    PluginItem: () => PluginItem,
    PluginKey: () => PluginKey,
    PluginList: () => PluginList,
    PluginMenu: () => PluginMenu,
    PluginPlayerActions: () => PluginPlayerActions,
    PluginPlayerButton: () => PluginPlayerButton,
    PluginPlayerConfirmButton: () => PluginPlayerConfirmButton,
    PluginPlayerList: () => PluginPlayerList,
    PluginSeparator: () => PluginSeparator,
    PluginSetting: () => PluginSetting,
    PluginSettings: () => PluginSettings,
    PluginSlider: () => PluginSlider,
    PluginStringSetting: () => PluginStringSetting,
    PluginSubmenu: () => PluginSubmenu,
    PluginThemes: () => PluginThemes,
    PluginTranslations: () => PluginTranslations,
    ServerPluginDeclaration: () => ServerPluginDeclaration,
    Text: () => Text,
    VMenuPlugin: () => VMenuPlugin,
    VMenuServer: () => VMenuServer,
    version: () => version
  });

  // src/version.ts
  var version = true ? "0.0.0-local" : "0.0.0-local";

  // src/text.ts
  var Text = class _Text {
    constructor(value, isKey, args) {
      this.value = value;
      this.isKey = isKey;
      this.args = args;
    }
    /** Text shown exactly as written, never translated. */
    static literal(text) {
      return new _Text(text, false);
    }
    /**
     * A translation key, optionally with named placeholder values. In the translated string,
     * `{name}` is replaced with the matching value, which can itself be a literal or another key.
     */
    static key(key, args) {
      return new _Text(key, true, args);
    }
    /** @internal */
    static toRef(text) {
      if (text === null || text === void 0) {
        return void 0;
      }
      if (!(text instanceof _Text)) {
        return { text: String(text) };
      }
      if (!text.isKey) {
        return { text: text.value };
      }
      const reference = { key: text.value };
      if (text.args) {
        const args = {};
        let any = false;
        for (const [name, value] of Object.entries(text.args)) {
          const argument = _Text.toRef(value);
          if (argument) {
            args[name] = argument;
            any = true;
          }
        }
        if (any) {
          reference.args = args;
        }
      }
      return reference;
    }
    /** @internal */
    static toRefs(options) {
      const refs = [];
      for (const option of options) {
        const reference = _Text.toRef(option);
        if (reference) {
          refs.push(reference);
        }
      }
      return refs;
    }
  };

  // src/client/gate.ts
  var Gate = class _Gate {
    constructor(node) {
      this.node = node;
    }
    /** One of the permissions your server side declared, by its short name. */
    static permission(shortName) {
      return new _Gate({ permission: shortName });
    }
    /** One of your bool settings: the item is available while the convar reads true. */
    static setting(setting) {
      return new _Gate({ setting: typeof setting === "string" ? setting : setting.name });
    }
    /** Passes when every gate passes. */
    static all(...gates) {
      return new _Gate({ all: gates.map(_Gate.toNode) });
    }
    /** Passes when at least one gate passes. */
    static any(...gates) {
      return new _Gate({ any: gates.map(_Gate.toNode) });
    }
    /** Passes when this gate and the other one both pass. */
    and(other) {
      return _Gate.all(this, other);
    }
    /** Passes when this gate or the other one passes. */
    or(other) {
      return _Gate.any(this, other);
    }
    /** @internal */
    static toNode(gate) {
      return typeof gate === "string" ? { permission: gate } : gate.node;
    }
  };

  // src/fivem.ts
  var natives = globalThis;
  var currentResource = () => natives.GetCurrentResourceName();
  var emitLocal = (eventName, ...args) => natives.emit(eventName, ...args);
  var onLocal = (eventName, handler) => natives.on(eventName, handler);
  var getConvar = (name, fallback) => natives.GetConvar(name, fallback) ?? fallback;
  var getKvp = (key) => natives.GetResourceKvpString(key) ?? void 0;
  var setKvp = (key, value) => natives.SetResourceKvp(key, value);
  var isAceAllowed = (playerSource, object) => Boolean(natives.IsPlayerAceAllowed(playerSource, object));
  var log = {
    info: (resource, message) => console.log(`[${resource}] ${message}`),
    warn: (resource, message) => console.warn(`[${resource}] ${message}`),
    error: (resource, message) => console.error(`[${resource}] ${message}`)
  };
  function parseJson(json) {
    if (typeof json !== "string") {
      return void 0;
    }
    try {
      return JSON.parse(json);
    } catch {
      return void 0;
    }
  }
  function sanitizeId(resource) {
    return resource.replace(/[^A-Za-z0-9]/g, "_");
  }

  // src/format.ts
  function formatFloat(value) {
    const text = value.toFixed(4).replace(/0+$/, "");
    return text.endsWith(".") ? `${text}0` : text;
  }
  function int(value) {
    const number = Math.trunc(Number(value));
    return Number.isFinite(number) ? number : 0;
  }

  // src/protocol.ts
  var PROTOCOL_VERSION = 2;
  var SERVER_PROTOCOL_VERSION = 1;
  var VMENU_RESOURCE = "vMenu.Enhanced";
  var PluginEvents = {
    Probe: "vMenu.Enhanced:Plugins:Probe",
    Register: "vMenu.Enhanced:Plugins:Register",
    Unregister: "vMenu.Enhanced:Plugins:Unregister",
    Update: "vMenu.Enhanced:Plugins:Update",
    Notify: "vMenu.Enhanced:Plugins:Notify",
    Prompt: "vMenu.Enhanced:Plugins:Prompt",
    SetTheme: "vMenu.Enhanced:Plugins:SetTheme",
    RegisterThemes: "vMenu.Enhanced:Plugins:RegisterThemes",
    Ready: "vMenu.Enhanced:Plugins:Ready",
    ServerProbe: "vMenu.Enhanced:Plugins:Server:Probe",
    ServerRegister: "vMenu.Enhanced:Plugins:Server:Register",
    ServerDenied: "vMenu.Enhanced:Plugins:Server:Denied",
    ServerReady: "vMenu.Enhanced:Plugins:Server:Ready",
    readyFor: (resource) => `vMenu.Enhanced:Plugins:${resource}:Ready`,
    registerResultFor: (resource) => `vMenu.Enhanced:Plugins:${resource}:RegisterResult`,
    eventFor: (resource) => `vMenu.Enhanced:Plugins:${resource}:Event`,
    promptResultFor: (resource) => `vMenu.Enhanced:Plugins:${resource}:PromptResult`,
    themesFor: (resource) => `vMenu.Enhanced:Plugins:${resource}:Themes`,
    themesRegisteredFor: (resource) => `vMenu.Enhanced:Plugins:${resource}:ThemesRegistered`,
    serverReadyFor: (resource) => `vMenu.Enhanced:Plugins:${resource}:Server:Ready`,
    serverRegisterResultFor: (resource) => `vMenu.Enhanced:Plugins:${resource}:Server:RegisterResult`
  };
  var RefreshPermissionsEvent = "vMenu.Enhanced:Permissions:Refresh";
  var EntryTypes = {
    Button: "button",
    Checkbox: "checkbox",
    List: "list",
    Slider: "slider",
    DynamicList: "dynamicList",
    Submenu: "submenu",
    Separator: "separator",
    ConfirmButton: "confirmButton",
    ConfirmList: "confirmList"
  };
  var NodeEvents = {
    Opened: "opened",
    Closed: "closed",
    IndexChanged: "indexChanged",
    Highlighted: "highlighted"
  };
  var SettingTypes = {
    Bool: "bool",
    Int: "int",
    Float: "float",
    String: "string"
  };
  var CallbackTypes = {
    ItemSelected: "itemSelected",
    CheckboxChanged: "checkboxChanged",
    ListIndexChanged: "listIndexChanged",
    ListSelected: "listSelected",
    SliderMoved: "sliderMoved",
    SliderSelected: "sliderSelected",
    DynamicSelected: "dynamicSelected",
    DynamicChanging: "dynamicChanging",
    Confirmed: "confirmed",
    ItemHighlighted: "itemHighlighted",
    MenuOpened: "menuOpened",
    MenuClosed: "menuClosed",
    MenuIndexChanged: "menuIndexChanged",
    PlayerActionSelected: "playerActionSelected",
    PlayerActionConfirmed: "playerActionConfirmed",
    PlayerActionListSelected: "playerActionListSelected",
    KeyPressed: "keyPressed"
  };
  var UpdateOps = {
    SetText: "setText",
    SetDescription: "setDescription",
    SetLabel: "setLabel",
    SetLockedDescription: "setLockedDescription",
    SetConfirmationDescription: "setConfirmationDescription",
    SetIcons: "setIcons",
    SetChecked: "setChecked",
    SetOptions: "setOptions",
    SetSelectedIndex: "setSelectedIndex",
    SetSliderPosition: "setSliderPosition",
    SetValue: "setValue",
    SetVisible: "setVisible",
    SetEnabled: "setEnabled",
    SetGate: "setGate",
    SetLog: "setLog",
    SetBehaviour: "setBehaviour",
    SetItemEvents: "setItemEvents",
    AddItems: "addItems",
    RemoveItems: "removeItems",
    ClearMenu: "clearMenu",
    MoveItem: "moveItem",
    AddPlayerActions: "addPlayerActions",
    SetMenuTitle: "setMenuTitle",
    SetMenuSubtitle: "setMenuSubtitle",
    OpenMenu: "openMenu",
    CloseMenu: "closeMenu",
    SelectItem: "selectItem",
    SetMenuEvents: "setMenuEvents",
    SetFilter: "setFilter",
    ClearFilter: "clearFilter",
    AddKeys: "addKeys",
    SetKeyText: "setKeyText",
    SetKeyEnabled: "setKeyEnabled",
    SetKeyGate: "setKeyGate",
    MergeTranslations: "mergeTranslations"
  };
  function normalizeResult(raw) {
    if (!raw || typeof raw !== "object") {
      return void 0;
    }
    return {
      accepted: raw.accepted === true,
      protocolVersion: typeof raw.protocolVersion === "number" ? raw.protocolVersion : 0,
      errors: Array.isArray(raw.errors) ? raw.errors : [],
      warnings: Array.isArray(raw.warnings) ? raw.warnings : []
    };
  }

  // src/client/settings.ts
  var PluginSetting = class {
    /** @internal */
    constructor(name, fullName, defaultValue) {
      this.name = name;
      this.fullName = fullName;
      this.defaultValue = defaultValue;
    }
    raw(fallback) {
      return getConvar(this.fullName, fallback);
    }
  };
  var PluginBoolSetting = class extends PluginSetting {
    get value() {
      return this.raw(this.defaultValue ? "true" : "false").toLowerCase() === "true";
    }
  };
  var PluginIntSetting = class extends PluginSetting {
    get value() {
      const raw = this.raw("").trim();
      return /^[+-]?\d+$/.test(raw) ? Number.parseInt(raw, 10) : this.defaultValue;
    }
  };
  var PluginFloatSetting = class extends PluginSetting {
    get value() {
      const raw = this.raw("").trim();
      const parsed = Number(raw);
      return raw.length > 0 && Number.isFinite(parsed) ? parsed : this.defaultValue;
    }
  };
  var PluginStringSetting = class extends PluginSetting {
    get value() {
      const raw = this.raw(this.defaultValue);
      return raw.length === 0 ? this.defaultValue : raw;
    }
  };
  var PluginSettings = class {
    /** @internal */
    constructor(pluginId2) {
      /** @internal */
      this.nodes = [];
      this.prefix = `vMenu.Enhanced.Plugins.${pluginId2}.`;
    }
    /** Declares an on or off setting. */
    bool(name, defaultValue, description) {
      this.declare(name, SettingTypes.Bool, defaultValue ? "true" : "false", description);
      return new PluginBoolSetting(name, this.prefix + name, defaultValue);
    }
    /** Declares a whole number setting. */
    int(name, defaultValue, description) {
      const value = Math.trunc(defaultValue);
      this.declare(name, SettingTypes.Int, String(value), description);
      return new PluginIntSetting(name, this.prefix + name, value);
    }
    /** Declares a decimal number setting. */
    float(name, defaultValue, description) {
      this.declare(name, SettingTypes.Float, formatFloat(defaultValue), description);
      return new PluginFloatSetting(name, this.prefix + name, defaultValue);
    }
    /** Declares a text setting. */
    string(name, defaultValue, description) {
      this.declare(name, SettingTypes.String, defaultValue, description);
      return new PluginStringSetting(name, this.prefix + name, defaultValue);
    }
    declare(name, type, defaultText, description) {
      this.nodes.push({ name, type, default: defaultText, description });
    }
  };

  // src/signal.ts
  var Signal = class {
    constructor(resource, name) {
      this.resource = resource;
      this.name = name;
      this.handlers = [];
    }
    get hasHandlers() {
      return this.handlers.length > 0;
    }
    add(handler) {
      this.handlers.push(handler);
      return () => {
        this.handlers = this.handlers.filter((existing) => existing !== handler);
      };
    }
    fire(...args) {
      for (const handler of [...this.handlers]) {
        try {
          handler(...args);
        } catch (error) {
          log.error(this.resource(), `A ${this.name} handler threw: ${describe(error)}`);
        }
      }
    }
  };
  function describe(error) {
    return error instanceof Error ? error.stack ?? error.message : String(error);
  }

  // src/client/diff.ts
  function sameText(left, right) {
    if (left === right) {
      return true;
    }
    if (!left || !right) {
      return false;
    }
    return left.text === right.text && left.key === right.key && sameArgs(left.args, right.args);
  }
  function sameTexts(left, right) {
    if (left === right) {
      return true;
    }
    if (!left || !right || left.length !== right.length) {
      return false;
    }
    return left.every((value, index) => sameText(value, right[index]));
  }
  function sameGate(left, right) {
    if (left === right) {
      return true;
    }
    if (!left || !right) {
      return false;
    }
    return left.permission === right.permission && left.setting === right.setting && sameGates(left.all, right.all) && sameGates(left.any, right.any);
  }
  function sameGates(left, right) {
    if (left === right) {
      return true;
    }
    if (!left || !right || left.length !== right.length) {
      return false;
    }
    return left.every((value, index) => sameGate(value, right[index]));
  }
  function sameArgs(left, right) {
    if (left === right) {
      return true;
    }
    if (!left || !right) {
      return false;
    }
    const keys = Object.keys(left);
    if (keys.length !== Object.keys(right).length) {
      return false;
    }
    return keys.every((key) => key in right && sameText(left[key], right[key]));
  }

  // src/client/item.ts
  var PluginItem = class {
    /** @internal */
    constructor(node, text) {
      this.node = node;
      this.textValue = text;
      this.highlighted = this.signal("highlighted");
    }
    /** The row's id, how vMenu refers to it. */
    get id() {
      return this.node.id;
    }
    /** The row's text. */
    get text() {
      return this.textValue;
    }
    set text(value) {
      this.textValue = value;
      this.setTextField("text", value, UpdateOps.SetText);
    }
    /** The line shown under the menu while the row is highlighted. */
    get description() {
      return this.descriptionValue;
    }
    set description(value) {
      this.descriptionValue = value;
      this.setTextField("description", value, UpdateOps.SetDescription);
    }
    /** Right aligned text. Ignored by rows whose label the menu draws itself. */
    get label() {
      return this.labelValue;
    }
    set label(value) {
      this.labelValue = value;
      this.setTextField("label", value, UpdateOps.SetLabel);
    }
    /** What the row says while its gate locks it. Empty uses vMenu's own wording. */
    get lockedDescription() {
      return this.lockedDescriptionValue;
    }
    set lockedDescription(value) {
      this.lockedDescriptionValue = value;
      this.setTextField("lockedDescription", value, UpdateOps.SetLockedDescription);
    }
    /** Decides whether the row is available, evaluated live by vMenu. */
    get gate() {
      return this.gateValue;
    }
    set gate(value) {
      this.gateValue = value;
      const gate = value === void 0 ? void 0 : Gate.toNode(value);
      if (sameGate(this.node.gate, gate)) {
        return;
      }
      this.node.gate = gate;
      this.emit({ op: UpdateOps.SetGate, itemId: this.id, gate });
    }
    /** What a failing gate does to the row: greyed out with a lock, or gone entirely. */
    get hideWhenLocked() {
      return this.node.behaviour?.toLowerCase() === "hide";
    }
    set hideWhenLocked(value) {
      const behaviour = value ? "hide" : "lock";
      if (this.node.behaviour === behaviour) {
        return;
      }
      this.node.behaviour = behaviour;
      this.emit({ op: UpdateOps.SetBehaviour, itemId: this.id, value: behaviour });
    }
    /** Whether the row is shown at all. */
    get visible() {
      return this.node.visible !== false;
    }
    set visible(value) {
      if (this.visible === value) {
        return;
      }
      this.node.visible = value;
      this.emit({ op: UpdateOps.SetVisible, itemId: this.id, flag: value });
    }
    /** A disabled row is greyed out but still visible. Independent of the gate. */
    get enabled() {
      return this.node.enabled !== false;
    }
    set enabled(value) {
      if (this.enabled === value) {
        return;
      }
      this.node.enabled = value;
      this.emit({ op: UpdateOps.SetEnabled, itemId: this.id, flag: value });
    }
    /**
     * Ask vMenu to log use of this row to the server owner's webhook. Does nothing on its own: the
     * plugin's server half has to declare the same id with `addLoggedItem`.
     */
    get log() {
      return this.node.log === true;
    }
    set log(value) {
      if (this.log === value) {
        return;
      }
      this.node.log = value;
      this.emit({ op: UpdateOps.SetLog, itemId: this.id, flag: value });
    }
    /** Icon names from the vMenu icon set, for example "LOCK" or "STAR". */
    setIcons(leftIcon, rightIcon) {
      if (this.node.leftIcon === leftIcon && this.node.rightIcon === rightIcon) {
        return;
      }
      this.node.leftIcon = leftIcon;
      this.node.rightIcon = rightIcon;
      this.emit({ op: UpdateOps.SetIcons, itemId: this.id, leftIcon, rightIcon });
    }
    /** Called while the player's cursor sits on this row. Chatty, subscribe deliberately. */
    onHighlighted(handler) {
      const unsubscribe = this.highlighted.add(handler);
      this.subscribeNodeEvent(NodeEvents.Highlighted);
      return unsubscribe;
    }
    /** @internal */
    applyOptions(options) {
      if (!options) {
        return;
      }
      if (options.description !== void 0) this.description = options.description;
      if (options.label !== void 0) this.label = options.label;
      if (options.lockedDescription !== void 0) this.lockedDescription = options.lockedDescription;
      if (options.gate !== void 0) this.gate = options.gate;
      if (options.hideWhenLocked !== void 0) this.hideWhenLocked = options.hideWhenLocked;
      if (options.visible !== void 0) this.visible = options.visible;
      if (options.enabled !== void 0) this.enabled = options.enabled;
      if (options.log !== void 0) this.log = options.log;
      if (options.leftIcon !== void 0 || options.rightIcon !== void 0) this.setIcons(options.leftIcon, options.rightIcon);
    }
    /** @internal */
    handle(callback) {
      if (callback.type === CallbackTypes.ItemHighlighted) {
        this.highlighted.fire();
      }
    }
    signal(name) {
      return new Signal(() => this.plugin?.resource ?? "", name);
    }
    subscribeNodeEvent(name) {
      var _a;
      (_a = this.node).events ?? (_a.events = []);
      if (this.node.events.includes(name)) {
        return;
      }
      this.node.events.push(name);
      this.emit({ op: UpdateOps.SetItemEvents, itemId: this.id, events: [...this.node.events] });
    }
    emit(op) {
      this.plugin?.emitOp(op);
    }
    setTextField(field, value, opName) {
      const next = Text.toRef(value);
      if (sameText(this.node[field], next)) {
        return;
      }
      this.node[field] = next;
      this.emit({ op: opName, itemId: this.id, textValue: next });
    }
  };

  // src/client/preferences.ts
  var KeyPrefix = "vmenu_plugin_pref_";
  function readBool(itemId) {
    const raw = getKvp(KeyPrefix + itemId);
    if (raw === "true") {
      return true;
    }
    if (raw === "false") {
      return false;
    }
    return void 0;
  }
  function writeBool(itemId, value) {
    setKvp(KeyPrefix + itemId, value ? "true" : "false");
  }

  // src/client/items.ts
  var PluginButton = class extends PluginItem {
    constructor() {
      super(...arguments);
      this.selected = this.signal("selected");
    }
    /** Called when the player presses the row. */
    onSelected(handler) {
      return this.selected.add(handler);
    }
    /** @internal */
    handle(callback) {
      super.handle(callback);
      if (callback.type === CallbackTypes.ItemSelected) {
        this.selected.fire();
      }
    }
  };
  var PluginConfirmButton = class extends PluginItem {
    constructor() {
      super(...arguments);
      this.confirmed = this.signal("confirmed");
    }
    /** What the row asks before its second press. Empty uses vMenu's own wording. */
    get confirmationDescription() {
      return this.confirmationDescriptionValue;
    }
    set confirmationDescription(value) {
      this.confirmationDescriptionValue = value;
      this.setTextField("confirmationDescription", value, UpdateOps.SetConfirmationDescription);
    }
    /** Called on the confirming second press, never on the first. */
    onConfirmed(handler) {
      return this.confirmed.add(handler);
    }
    /** @internal */
    handle(callback) {
      super.handle(callback);
      if (callback.type === CallbackTypes.Confirmed) {
        this.confirmed.fire();
      }
    }
  };
  var PluginCheckbox = class extends PluginItem {
    constructor() {
      super(...arguments);
      this.changed = this.signal("changed");
      /** @internal */
      this.persistedValue = false;
    }
    /** Whether the state is saved in this resource's key value store and restored on start. */
    get persisted() {
      return this.persistedValue;
    }
    /** Whether the box is ticked. */
    get checked() {
      return this.node.checked === true;
    }
    set checked(value) {
      if (this.checked === value) {
        return;
      }
      this.node.checked = value;
      this.remember(value);
      this.emit({ op: UpdateOps.SetChecked, itemId: this.id, flag: value });
    }
    /** Called when the player toggles the box. The new state is already in `checked`. */
    onChanged(handler) {
      return this.changed.add(handler);
    }
    /** @internal */
    handle(callback) {
      super.handle(callback);
      if (callback.type === CallbackTypes.CheckboxChanged && typeof callback.checked === "boolean") {
        this.node.checked = callback.checked;
        this.remember(callback.checked);
        this.changed.fire(callback.checked);
      }
    }
    remember(state) {
      if (this.persistedValue) {
        writeBool(this.id, state);
      }
    }
  };
  var PluginList = class extends PluginItem {
    constructor() {
      super(...arguments);
      this.indexChanged = this.signal("indexChanged");
      this.selected = this.signal("selected");
    }
    /** The selected option, counted from 0. */
    get selectedIndex() {
      return this.node.selectedIndex ?? 0;
    }
    set selectedIndex(value) {
      value = int(value);
      if (this.selectedIndex === value) {
        return;
      }
      this.node.selectedIndex = value;
      this.emit({ op: UpdateOps.SetSelectedIndex, itemId: this.id, index: value });
    }
    /** Replaces the options, optionally moving the selection at the same time. */
    setOptions(options, selectedIndex) {
      const refs = Text.toRefs(options);
      selectedIndex = selectedIndex === void 0 ? void 0 : int(selectedIndex);
      if (sameTexts(this.node.options, refs) && (selectedIndex === void 0 || selectedIndex === this.selectedIndex)) {
        return;
      }
      this.node.options = refs;
      if (selectedIndex !== void 0) {
        this.node.selectedIndex = selectedIndex;
      }
      this.emit({ op: UpdateOps.SetOptions, itemId: this.id, options: refs, index: selectedIndex });
    }
    /** Called when the player scrolls the value. The new index is already in `selectedIndex`. */
    onIndexChanged(handler) {
      return this.indexChanged.add(handler);
    }
    /** Called when the player presses the row, with the index they had selected. */
    onSelected(handler) {
      return this.selected.add(handler);
    }
    /** @internal */
    handle(callback) {
      super.handle(callback);
      switch (callback.type) {
        case CallbackTypes.ListIndexChanged:
          if (typeof callback.newIndex === "number") {
            this.node.selectedIndex = callback.newIndex;
            this.indexChanged.fire(callback.oldIndex ?? 0, callback.newIndex);
          }
          break;
        case CallbackTypes.ListSelected:
          if (typeof callback.selectedIndex === "number") {
            this.selected.fire(callback.selectedIndex);
          }
          break;
        case CallbackTypes.Confirmed:
          if (typeof callback.selectedIndex === "number") {
            this.raiseConfirmed(callback.selectedIndex);
          }
          break;
      }
    }
    raiseConfirmed(_index) {
    }
  };
  var PluginConfirmList = class extends PluginList {
    constructor() {
      super(...arguments);
      this.confirmed = this.signal("confirmed");
    }
    /** What the row asks before its second press. Empty uses vMenu's own wording. */
    get confirmationDescription() {
      return this.confirmationDescriptionValue;
    }
    set confirmationDescription(value) {
      this.confirmationDescriptionValue = value;
      this.setTextField("confirmationDescription", value, UpdateOps.SetConfirmationDescription);
    }
    /** Called on the confirming second press, with the index that was confirmed. */
    onConfirmed(handler) {
      return this.confirmed.add(handler);
    }
    raiseConfirmed(index) {
      this.confirmed.fire(index);
    }
  };
  var PluginSlider = class extends PluginItem {
    constructor() {
      super(...arguments);
      this.moved = this.signal("moved");
      this.selected = this.signal("selected");
    }
    /** The lowest position. */
    get min() {
      return this.node.min ?? 0;
    }
    /** The highest position. */
    get max() {
      return this.node.max ?? 0;
    }
    /** Where the bar sits. */
    get position() {
      return this.node.position ?? this.min;
    }
    set position(value) {
      value = int(value);
      if (this.position === value) {
        return;
      }
      this.node.position = value;
      this.emit({ op: UpdateOps.SetSliderPosition, itemId: this.id, index: value });
    }
    /** Called while the player drags the bar. The new position is already in `position`. */
    onMoved(handler) {
      return this.moved.add(handler);
    }
    /** Called when the player presses the row, with the position it sat at. */
    onSelected(handler) {
      return this.selected.add(handler);
    }
    /** @internal */
    handle(callback) {
      super.handle(callback);
      switch (callback.type) {
        case CallbackTypes.SliderMoved:
          if (typeof callback.newPosition === "number") {
            this.node.position = callback.newPosition;
            this.moved.fire(callback.oldPosition ?? 0, callback.newPosition);
          }
          break;
        case CallbackTypes.SliderSelected:
          if (typeof callback.position === "number") {
            this.selected.fire(callback.position);
          }
          break;
      }
    }
  };
  var PluginDynamicList = class extends PluginItem {
    constructor() {
      super(...arguments);
      this.selected = this.signal("selected");
    }
    /** The value the row shows. */
    get value() {
      return this.node.value ?? "";
    }
    set value(value) {
      value = String(value);
      if (this.value === value) {
        return;
      }
      this.node.value = value;
      this.emit({ op: UpdateOps.SetValue, itemId: this.id, value });
    }
    /** Called when the player presses the row, with the value it showed. */
    onSelected(handler) {
      return this.selected.add(handler);
    }
    /** @internal */
    handle(callback) {
      super.handle(callback);
      switch (callback.type) {
        case CallbackTypes.DynamicChanging:
          if (typeof callback.left === "boolean") {
            const next = this.changeRequested?.(callback.currentValue ?? "", callback.left);
            if (next !== null && next !== void 0) {
              this.value = next;
            }
          }
          break;
        case CallbackTypes.DynamicSelected:
          this.selected.fire(callback.value ?? "");
          break;
      }
    }
  };
  var PluginSeparator = class extends PluginItem {
  };
  var PluginSubmenu = class extends PluginItem {
    /** @internal */
    constructor(node, text, menu) {
      super(node, text);
      this.menu = menu;
    }
  };

  // src/client/key.ts
  var PluginKey = class {
    /** @internal */
    constructor(plugin, node, text) {
      this.plugin = plugin;
      this.node = node;
      this.textValue = text;
      this.pressed = new Signal(() => plugin.resource, "pressed");
    }
    /** The key's id, which also names the binding in the player's key settings. */
    get id() {
      return this.node.id;
    }
    /** The instructional button's label. Empty hides the button, the key still works. */
    get text() {
      return this.textValue;
    }
    set text(value) {
      this.textValue = value;
      const text = Text.toRef(value);
      if (sameText(this.node.text, text)) {
        return;
      }
      this.node.text = text;
      this.plugin.emitOp({ op: UpdateOps.SetKeyText, keyId: this.id, textValue: text });
    }
    /** A disabled key does nothing and shows no button. */
    get enabled() {
      return this.node.enabled !== false;
    }
    set enabled(value) {
      if (this.enabled === value) {
        return;
      }
      this.node.enabled = value;
      this.plugin.emitOp({ op: UpdateOps.SetKeyEnabled, keyId: this.id, flag: value });
    }
    /** While the gate fails the key does nothing and shows no button. */
    get gate() {
      return this.gateValue;
    }
    set gate(value) {
      this.gateValue = value;
      const gate = value === void 0 ? void 0 : Gate.toNode(value);
      if (sameGate(this.node.gate, gate)) {
        return;
      }
      this.node.gate = gate;
      this.plugin.emitOp({ op: UpdateOps.SetKeyGate, keyId: this.id, gate });
    }
    /** Called when the player presses the key, with the row the cursor was on. */
    onPressed(handler) {
      return this.pressed.add(handler);
    }
    /** @internal */
    handle(press) {
      this.pressed.fire(press);
    }
  };

  // src/client/menu.ts
  var PluginMenu = class _PluginMenu {
    /** @internal */
    constructor(plugin, node, title, subtitle) {
      this.plugin = plugin;
      this.itemList = [];
      this.keyList = [];
      this.node = node;
      this.titleValue = title;
      this.subtitleValue = subtitle;
      this.opened = new Signal(() => plugin.resource, "opened");
      this.closed = new Signal(() => plugin.resource, "closed");
      this.indexChanged = new Signal(() => plugin.resource, "indexChanged");
    }
    /** The menu's id, how vMenu refers to it. */
    get id() {
      return this.node.id;
    }
    /** Every row, in order. */
    get items() {
      return this.itemList;
    }
    /** Every key of this menu. */
    get keys() {
      return this.keyList;
    }
    /** Whether `filter` is hiding rows right now. */
    get isFiltered() {
      return this.filterFn !== void 0;
    }
    /** The title in the menu's banner. */
    get title() {
      return this.titleValue;
    }
    set title(value) {
      this.titleValue = value;
      const title = Text.toRef(value);
      if (sameText(this.node.title, title)) {
        return;
      }
      this.node.title = title;
      this.plugin.emitOp({ op: UpdateOps.SetMenuTitle, menuId: this.id, textValue: title });
    }
    /** The bar under the banner. */
    get subtitle() {
      return this.subtitleValue;
    }
    set subtitle(value) {
      this.subtitleValue = value;
      const subtitle = Text.toRef(value);
      if (sameText(this.node.subtitle, subtitle)) {
        return;
      }
      this.node.subtitle = subtitle;
      this.plugin.emitOp({ op: UpdateOps.SetMenuSubtitle, menuId: this.id, textValue: subtitle });
    }
    /** Called when the player opens this menu. */
    onOpened(handler) {
      const unsubscribe = this.opened.add(handler);
      this.subscribeMenuEvent(NodeEvents.Opened);
      return unsubscribe;
    }
    /** Called when the player leaves this menu, including into a submenu. */
    onClosed(handler) {
      const unsubscribe = this.closed.add(handler);
      this.subscribeMenuEvent(NodeEvents.Closed);
      return unsubscribe;
    }
    /** Called when the cursor moves, with the old and new row index counted from 0. Chatty. */
    onIndexChanged(handler) {
      const unsubscribe = this.indexChanged.add(handler);
      this.subscribeMenuEvent(NodeEvents.IndexChanged);
      return unsubscribe;
    }
    /** Adds a row the player presses. */
    addButton(text, options) {
      return this.attach(new PluginButton(this.newNode(EntryTypes.Button, text, options), text), options);
    }
    /** Adds a row that asks for a second press before it does anything. */
    addConfirmButton(text, options) {
      const item = new PluginConfirmButton(this.newNode(EntryTypes.ConfirmButton, text, options), text);
      if (options?.confirmationDescription !== void 0) {
        item.confirmationDescription = options.confirmationDescription;
      }
      return this.attach(item, options);
    }
    /** Adds a row with a tick box. */
    addCheckbox(text, options) {
      const node = this.newNode(EntryTypes.Checkbox, text, options);
      node.checked = options?.checked ?? false;
      const checkbox = new PluginCheckbox(node, text);
      if (options?.persist) {
        checkbox.persistedValue = true;
        const stored = readBool(node.id);
        if (stored !== void 0) {
          node.checked = stored;
        }
      }
      return this.attach(checkbox, options);
    }
    /** Adds a row the player scrolls through a set of options on. */
    addList(text, values, options) {
      const node = this.newNode(EntryTypes.List, text, options);
      node.options = Text.toRefs(values);
      node.selectedIndex = int(options?.selectedIndex ?? 0);
      return this.attach(new PluginList(node, text), options);
    }
    /** Adds a list that asks for a second press before it does anything. */
    addConfirmList(text, values, options) {
      const node = this.newNode(EntryTypes.ConfirmList, text, options);
      node.options = Text.toRefs(values);
      node.selectedIndex = int(options?.selectedIndex ?? 0);
      const item = new PluginConfirmList(node, text);
      if (options?.confirmationDescription !== void 0) {
        item.confirmationDescription = options.confirmationDescription;
      }
      return this.attach(item, options);
    }
    /** Adds a row with a bar the player drags between `min` and `max`. */
    addSlider(text, min, max, position, options) {
      const node = this.newNode(EntryTypes.Slider, text, options);
      node.min = int(min);
      node.max = int(max);
      node.position = int(position);
      node.showDivider = options?.showDivider ?? false;
      return this.attach(new PluginSlider(node, text), options);
    }
    /** Adds a row whose value your code works out each time the player scrolls it, through `changeRequested`. */
    addDynamicList(text, initialValue, options) {
      const node = this.newNode(EntryTypes.DynamicList, text, options);
      node.value = String(initialValue);
      return this.attach(new PluginDynamicList(node, text), options);
    }
    /** Adds a row that only shows text, used to split a menu into sections. */
    addSeparator(text, options) {
      return this.attach(new PluginSeparator(this.newNode(EntryTypes.Separator, text, options), text), options);
    }
    /** Adds a row that opens a new menu, reached through the returned row's `menu`. */
    addSubmenu(text, options) {
      const node = this.newNode(EntryTypes.Submenu, text, options);
      const title = options?.title ?? text;
      node.menu = {
        id: this.plugin.nextMenuId(),
        title: Text.toRef(title),
        subtitle: Text.toRef(options?.subtitle),
        items: []
      };
      const menu = new _PluginMenu(this.plugin, node.menu, title, options?.subtitle);
      this.plugin.registerMenu(menu);
      return this.attach(new PluginSubmenu(node, text, menu), options);
    }
    /**
     * Adds a key that works while this menu is open, with an instructional button at the bottom of the
     * screen. Keep the id stable: it names the binding in the player's key settings, so changing it
     * loses a key they picked themselves.
     * @param id Letters, digits and underscores, unique within your plugin.
     * @param text The instructional button's label.
     * @param defaultKey A keyboard key name as the game knows it, for example "X" or "F5".
     */
    addKey(id, text, defaultKey, options) {
      var _a;
      const node = {
        id,
        text: Text.toRef(text),
        description: Text.toRef(options?.description),
        defaultKey,
        defaultButton: options?.defaultButton,
        shadowedControl: options?.shadowedControl === void 0 ? void 0 : int(options.shadowedControl)
      };
      (_a = this.node).keys ?? (_a.keys = []);
      this.node.keys.push(node);
      const key = new PluginKey(this.plugin, node, text);
      this.keyList.push(key);
      this.plugin.registerKey(key);
      this.plugin.emitOp({ op: UpdateOps.AddKeys, menuId: this.id, keys: [node] });
      return key;
    }
    /**
     * Rows added inside `add` go in at `index`, counted from 0, one after another, instead of at the
     * bottom. Adding goes back to the bottom once `add` returns.
     */
    insertAt(index, add) {
      const previous = this.insertIndex;
      this.insertIndex = clamp(int(index), 0, this.itemList.length);
      try {
        add();
      } finally {
        this.insertIndex = previous;
      }
    }
    /** Moves a row of this menu to `index`, counted from 0. A submenu row keeps its menu, and the highlighted row stays highlighted. */
    move(item, index) {
      const from = this.itemList.indexOf(item);
      if (from < 0) {
        return;
      }
      const to = clamp(int(index), 0, this.itemList.length - 1);
      if (to === from) {
        return;
      }
      this.itemList.splice(from, 1);
      this.itemList.splice(to, 0, item);
      this.node.items.splice(from, 1);
      this.node.items.splice(to, 0, item.node);
      const before = to + 1 < this.itemList.length ? this.itemList[to + 1].id : void 0;
      this.plugin.emitOp({ op: UpdateOps.MoveItem, itemId: item.id, beforeItemId: before });
    }
    /**
     * Shows only the rows `keep` answers true for. Rows added later are checked too: inside a batch
     * when the batch ends, so properties set right after adding count, otherwise as they come in. Call
     * it again after changing what it looks at.
     */
    filter(keep) {
      this.filterFn = keep;
      this.plugin.filterChanged(this);
    }
    /** Shows every row again after `filter`. */
    clearFilter() {
      if (this.filterFn === void 0) {
        return;
      }
      this.filterFn = void 0;
      this.plugin.filterChanged(this);
    }
    /** Removes one row. For a submenu row, everything beneath it goes too. */
    remove(item) {
      if (!this.removeLocal(item)) {
        return;
      }
      this.plugin.emitOp({ op: UpdateOps.RemoveItems, itemIds: [item.id] });
    }
    /** Removes every row. */
    clear() {
      for (const item of this.itemList) {
        this.plugin.unregisterItem(item);
      }
      this.itemList.length = 0;
      this.node.items.length = 0;
      this.plugin.emitOp({ op: UpdateOps.ClearMenu, menuId: this.id });
    }
    /** Opens this menu on screen, closing whatever vMenu menu was open. */
    open() {
      this.plugin.emitOp({ op: UpdateOps.OpenMenu, menuId: this.id });
    }
    /** Closes this plugin's menu if one is open. */
    close() {
      this.plugin.emitOp({ op: UpdateOps.CloseMenu, menuId: this.id });
    }
    /**
     * Moves the cursor to a row of this menu, as if the player had moved there. Does nothing for a
     * hidden row or one from another menu.
     */
    select(item) {
      if (this.itemList.includes(item)) {
        this.plugin.emitOp({ op: UpdateOps.SelectItem, menuId: this.id, itemId: item.id });
      }
    }
    /** @internal */
    get hasFilter() {
      return this.filterFn !== void 0;
    }
    /** @internal */
    hides(item) {
      return this.filterFn !== void 0 && !this.filterFn(item);
    }
    /** @internal */
    filterOp() {
      const keep = this.filterFn;
      if (keep === void 0) {
        return { op: UpdateOps.ClearFilter, menuId: this.id };
      }
      return { op: UpdateOps.SetFilter, menuId: this.id, itemIds: this.itemList.filter((item) => !keep(item)).map((item) => item.id) };
    }
    /** @internal */
    handleMenu(callback) {
      switch (callback.type) {
        case CallbackTypes.MenuOpened:
          this.opened.fire();
          break;
        case CallbackTypes.MenuClosed:
          this.closed.fire();
          break;
        case CallbackTypes.MenuIndexChanged:
          if (typeof callback.newIndex === "number") {
            this.indexChanged.fire(callback.oldIndex ?? 0, callback.newIndex);
          }
          break;
      }
    }
    /** @internal */
    static asAdded(node) {
      if (!node.menu) {
        return node;
      }
      const { items: _items, ...menu } = node.menu;
      return { ...node, menu: { ...menu, items: [] } };
    }
    newNode(type, text, options) {
      return { id: options?.id ?? this.plugin.nextItemId(), type, text: Text.toRef(text) };
    }
    attach(item, options) {
      item.applyOptions(options);
      item.plugin = this.plugin;
      let before;
      if (this.insertIndex !== void 0 && this.insertIndex < this.itemList.length) {
        before = this.itemList[this.insertIndex].id;
        this.itemList.splice(this.insertIndex, 0, item);
        this.node.items.splice(this.insertIndex, 0, item.node);
        this.insertIndex++;
      } else {
        this.itemList.push(item);
        this.node.items.push(item.node);
        if (this.insertIndex !== void 0) {
          this.insertIndex = this.itemList.length;
        }
      }
      this.plugin.registerItem(item);
      this.plugin.emitAdd(this, item, { op: UpdateOps.AddItems, menuId: this.id, items: [item.node], beforeItemId: before });
      return item;
    }
    removeLocal(item) {
      const index = this.itemList.lastIndexOf(item);
      if (index < 0) {
        return false;
      }
      this.itemList.splice(index, 1);
      const nodeIndex = this.node.items.lastIndexOf(item.node);
      if (nodeIndex >= 0) {
        this.node.items.splice(nodeIndex, 1);
      }
      this.plugin.unregisterItem(item);
      return true;
    }
    subscribeMenuEvent(name) {
      var _a;
      (_a = this.node).events ?? (_a.events = []);
      if (this.node.events.includes(name)) {
        return;
      }
      this.node.events.push(name);
      this.plugin.emitOp({ op: UpdateOps.SetMenuEvents, menuId: this.id, events: [...this.node.events] });
    }
  };
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // src/client/playerActions.ts
  function target(callback) {
    return typeof callback.targetServerId === "number" ? { serverId: callback.targetServerId, name: callback.targetName ?? "" } : void 0;
  }
  var PluginPlayerButton = class extends PluginItem {
    constructor() {
      super(...arguments);
      this.selected = this.signal("selected");
    }
    /** Called when the action is used on a player, with that player as the target. */
    onSelected(handler) {
      return this.selected.add(handler);
    }
    /** @internal */
    handle(callback) {
      super.handle(callback);
      const player = target(callback);
      if (callback.type === CallbackTypes.PlayerActionSelected && player) {
        this.selected.fire(player);
      }
    }
  };
  var PluginPlayerConfirmButton = class extends PluginItem {
    constructor() {
      super(...arguments);
      this.confirmed = this.signal("confirmed");
    }
    /** What the row asks before its second press. Empty uses vMenu's own wording. */
    get confirmationDescription() {
      return this.confirmationDescriptionValue;
    }
    set confirmationDescription(value) {
      this.confirmationDescriptionValue = value;
      this.node.confirmationDescription = Text.toRef(value);
      this.emit({
        op: UpdateOps.SetConfirmationDescription,
        itemId: this.id,
        textValue: this.node.confirmationDescription
      });
    }
    /** Called on the confirming second press, with the targeted player. */
    onConfirmed(handler) {
      return this.confirmed.add(handler);
    }
    /** @internal */
    handle(callback) {
      super.handle(callback);
      const player = target(callback);
      if (callback.type === CallbackTypes.PlayerActionConfirmed && player) {
        this.confirmed.fire(player);
      }
    }
  };
  var PluginPlayerList = class extends PluginItem {
    constructor() {
      super(...arguments);
      this.selected = this.signal("selected");
    }
    /** The current selection, counted from 0. Shared across every player the menu shows, since the same rows serve them all. */
    get selectedIndex() {
      return this.node.selectedIndex ?? 0;
    }
    set selectedIndex(value) {
      this.node.selectedIndex = int(value);
      this.emit({ op: UpdateOps.SetSelectedIndex, itemId: this.id, index: this.node.selectedIndex });
    }
    /** Replaces the options, optionally moving the selection at the same time. */
    setOptions(options, selectedIndex) {
      this.node.options = Text.toRefs(options);
      selectedIndex = selectedIndex === void 0 ? void 0 : int(selectedIndex);
      if (selectedIndex !== void 0) {
        this.node.selectedIndex = selectedIndex;
      }
      this.emit({ op: UpdateOps.SetOptions, itemId: this.id, options: this.node.options, index: selectedIndex });
    }
    /** Called when the action is used on a player, with the target and the chosen index. */
    onSelected(handler) {
      return this.selected.add(handler);
    }
    /** @internal */
    handle(callback) {
      super.handle(callback);
      const player = target(callback);
      if (callback.type === CallbackTypes.PlayerActionListSelected && player) {
        if (typeof callback.selectedIndex === "number") {
          this.node.selectedIndex = callback.selectedIndex;
        }
        this.selected.fire(player, callback.selectedIndex ?? 0);
      }
    }
  };
  var PluginPlayerActions = class {
    /** @internal */
    constructor(plugin) {
      this.plugin = plugin;
      this.itemList = [];
      /** @internal */
      this.nodes = [];
    }
    /** Every action, in order. */
    get items() {
      return this.itemList;
    }
    /** Adds an action the player presses. */
    addButton(text, options) {
      return this.attach(new PluginPlayerButton(this.newNode(EntryTypes.Button, text, options), text), options);
    }
    /** Adds an action that asks for a second press. */
    addConfirmButton(text, options) {
      const item = new PluginPlayerConfirmButton(this.newNode(EntryTypes.ConfirmButton, text, options), text);
      if (options?.confirmationDescription !== void 0) {
        item.confirmationDescription = options.confirmationDescription;
      }
      return this.attach(item, options);
    }
    /** Adds an action with a set of options. */
    addList(text, values, options) {
      const node = this.newNode(EntryTypes.List, text, options);
      node.options = Text.toRefs(values);
      node.selectedIndex = int(options?.selectedIndex ?? 0);
      return this.attach(new PluginPlayerList(node, text), options);
    }
    /** Adds a row that only shows text. */
    addSeparator(text, options) {
      return this.attach(new PluginSeparator(this.newNode(EntryTypes.Separator, text, options), text), options);
    }
    /** Removes one action from every player's entry. */
    remove(item) {
      const index = this.itemList.indexOf(item);
      if (index < 0) {
        return;
      }
      this.itemList.splice(index, 1);
      const nodeIndex = this.nodes.indexOf(item.node);
      if (nodeIndex >= 0) {
        this.nodes.splice(nodeIndex, 1);
      }
      this.plugin.unregisterItem(item);
      this.plugin.emitOp({ op: UpdateOps.RemoveItems, itemIds: [item.id] });
    }
    newNode(type, text, options) {
      return { id: options?.id ?? this.plugin.nextItemId(), type, text: Text.toRef(text) };
    }
    attach(item, options) {
      item.applyOptions(options);
      item.plugin = this.plugin;
      this.itemList.push(item);
      this.nodes.push(item.node);
      this.plugin.registerItem(item);
      this.plugin.emitOp({ op: UpdateOps.AddPlayerActions, items: [item.node] });
      return item;
    }
  };

  // src/client/themes.ts
  var PluginThemes = class {
    /** @internal */
    constructor(plugin) {
      this.plugin = plugin;
      this.availableValue = [];
      this.overriddenValue = false;
      this.changed = new Signal(() => plugin.resource, "themes changed");
    }
    /** Every theme vMenu offers, in the order it lists them. Empty until vMenu has sent them. */
    get available() {
      return this.availableValue;
    }
    /** The id of the theme on screen, undefined until vMenu has said what it is. */
    get currentId() {
      return this.currentIdValue;
    }
    /** The id the server's own setting asks for, which is where `reset` goes. */
    get configuredId() {
      return this.configuredIdValue;
    }
    /** Whether a plugin is overriding the server's setting for this player right now. */
    get isOverridden() {
      return this.overriddenValue;
    }
    /** Called whenever the list or the theme on screen changed, including when somebody else changed it. */
    onChanged(handler) {
      return this.changed.add(handler);
    }
    /** Puts vMenu's menus in a theme for this player. An id vMenu does not know is ignored. */
    set(themeId) {
      this.send(themeId);
    }
    /** Drops the override and goes back to the theme the server's setting asks for. */
    reset() {
      this.send(void 0);
    }
    /** @internal */
    handle(json) {
      const list = parseJson(json);
      if (!list) {
        return;
      }
      const current = list.current?.toLowerCase();
      this.availableValue = (Array.isArray(list.themes) ? list.themes : []).filter((theme) => typeof theme?.id === "string").map((theme) => ({
        id: theme.id,
        name: typeof theme.name === "string" ? theme.name : theme.id,
        isCurrent: theme.id.toLowerCase() === current
      }));
      this.currentIdValue = list.current ?? void 0;
      this.configuredIdValue = list.configured ?? void 0;
      this.overriddenValue = list.overridden === true;
      this.changed.fire();
    }
    send(themeId) {
      if (!this.plugin.isConnected) {
        return;
      }
      emitLocal(PluginEvents.SetTheme, JSON.stringify({ theme: themeId ?? null }));
    }
  };

  // src/client/translations.ts
  var PluginTranslations = class {
    /** @internal */
    constructor(plugin) {
      this.plugin = plugin;
      /** @internal */
      this.tables = {};
    }
    /** Adds or extends one language's table. Later entries win over earlier ones. */
    add(languageCode, entries) {
      var _a;
      const code = languageCode.trim().toLowerCase();
      const table = (_a = this.tables)[code] ?? (_a[code] = {});
      const merged = {};
      for (const [key, value] of Object.entries(entries)) {
        table[key] = value;
        merged[key] = value;
      }
      this.plugin.mergeTranslations(code, merged);
    }
  };

  // src/client/plugin.ts
  var NotifyStyle = {
    Info: "info",
    Success: "success",
    Warning: "warning",
    Error: "error"
  };
  var CarriedItemOps = /* @__PURE__ */ new Set([
    UpdateOps.SetText,
    UpdateOps.SetDescription,
    UpdateOps.SetLabel,
    UpdateOps.SetLockedDescription,
    UpdateOps.SetConfirmationDescription,
    UpdateOps.SetIcons,
    UpdateOps.SetChecked,
    UpdateOps.SetOptions,
    UpdateOps.SetSelectedIndex,
    UpdateOps.SetSliderPosition,
    UpdateOps.SetValue,
    UpdateOps.SetVisible,
    UpdateOps.SetEnabled,
    UpdateOps.SetGate,
    UpdateOps.SetLog,
    UpdateOps.SetBehaviour,
    UpdateOps.SetItemEvents
  ]);
  var CarriedMenuOps = /* @__PURE__ */ new Set([
    UpdateOps.SetMenuTitle,
    UpdateOps.SetMenuSubtitle,
    UpdateOps.SetMenuEvents,
    UpdateOps.AddKeys
  ]);
  var instance;
  var VMenuPlugin = class _VMenuPlugin {
    constructor(displayName) {
      this.displayName = displayName;
      this.itemsById = /* @__PURE__ */ new Map();
      this.menusById = /* @__PURE__ */ new Map();
      this.keysById = /* @__PURE__ */ new Map();
      this.pendingPrompts = /* @__PURE__ */ new Map();
      this.pendingItems = /* @__PURE__ */ new Set();
      this.pendingMenus = /* @__PURE__ */ new Set();
      this.dirtyFilters = [];
      this.batchDepth = 0;
      this.nextItem = 0;
      this.nextMenu = 0;
      this.nextPrompt = 0;
      this.handlersRegistered = false;
      this.connected = false;
      this.resource = currentResource();
      this.id = sanitizeId(this.resource);
      this.settings = new PluginSettings(this.id);
      this.themes = new PluginThemes(this);
      this.translations = new PluginTranslations(this);
      this.playerActions = new PluginPlayerActions(this);
      this.rootMenu = new PluginMenu(this, { id: "root", title: Text.toRef(displayName), items: [] }, displayName);
      this.registrationAnswered = new Signal(() => this.resource, "registration answered");
      this.disconnected = new Signal(() => this.resource, "disconnected");
      this.registerMenu(this.rootMenu);
    }
    /** Creates the plugin. One per resource: a second call returns the first instance. */
    static create(displayName) {
      if (instance) {
        log.warn(instance.resource, "VMenuPlugin.create was called twice, returning the first instance.");
        return instance;
      }
      instance = new _VMenuPlugin(displayName);
      return instance;
    }
    /** Whether vMenu currently has this plugin registered. */
    get isConnected() {
      return this.connected;
    }
    /** Called on every registration answer, including automatic re-registrations. */
    onRegistrationAnswered(handler) {
      return this.registrationAnswered.add(handler);
    }
    /** Called when vMenu stops, after which the plugin waits to register again. */
    onDisconnected(handler) {
      return this.disconnected.add(handler);
    }
    /**
     * Registers with vMenu. The promise resolves on vMenu's first answer, which can be a while when
     * vMenu starts later than your resource. It never rejects: a refusal arrives as a result with
     * `accepted` false.
     */
    connect() {
      this.firstResult ?? (this.firstResult = new Promise((resolve) => {
        this.resolveFirst = resolve;
      }));
      this.ensureHandlers();
      emitLocal(PluginEvents.Probe);
      return this.firstResult;
    }
    /** Shows a message through vMenu's notification area, credited to your resource. */
    notify(style, text, durationMs) {
      if (!this.connected) {
        return;
      }
      emitLocal(PluginEvents.Notify, JSON.stringify({ style, text: Text.toRef(text), durationMs: durationMs === void 0 ? void 0 : int(durationMs) }));
    }
    /** Asks the player for text through vMenu's input box. Resolves to null if they cancelled or the box was unavailable. */
    async getText(title, options) {
      const answers = await this.getTexts([{ title, ...options }]);
      return answers && answers.length > 0 ? answers[0] : null;
    }
    /** Asks several questions one after another. Resolves to null if the player cancelled any of them. */
    getTexts(prompts) {
      if (prompts.length === 0 || !this.connected) {
        return Promise.resolve(null);
      }
      const requestId = ++this.nextPrompt;
      const request = {
        requestId,
        prompts: prompts.map((prompt) => ({
          title: Text.toRef(prompt.title),
          maxLength: int(prompt.maxLength ?? 60),
          initial: String(prompt.initialValue ?? ""),
          suggestions: prompt.suggestions && prompt.suggestions.length > 0 ? prompt.suggestions.map((suggestion) => ({ value: suggestion.value, description: suggestion.description })) : void 0
        }))
      };
      const pending = new Promise((resolve) => this.pendingPrompts.set(requestId, resolve));
      emitLocal(PluginEvents.Prompt, JSON.stringify(request));
      return pending.then((result) => result.cancelled || !Array.isArray(result.answers) ? null : [...result.answers]);
    }
    /**
     * Groups every change made inside `changes` into one update, so many small changes cost vMenu a
     * single repaint. Nesting is fine: only the outermost batch sends. The batch ends when `changes`
     * returns, so changes made after an `await` inside it are sent on their own.
     */
    batch(changes) {
      this.batchOps ?? (this.batchOps = []);
      this.batchDepth++;
      try {
        return changes();
      } finally {
        this.endBatch();
      }
    }
    /** @internal */
    nextItemId() {
      return `i${++this.nextItem}`;
    }
    /** @internal */
    nextMenuId() {
      return `m${++this.nextMenu}`;
    }
    /** @internal */
    registerMenu(menu) {
      this.menusById.set(menu.id, menu);
    }
    /** @internal */
    registerItem(item) {
      this.itemsById.set(item.id, item);
    }
    /** @internal */
    registerKey(key) {
      if (this.keysById.has(key.id)) {
        log.warn(this.resource, `Key id '${key.id}' is used twice, vMenu will skip the second one.`);
        return;
      }
      this.keysById.set(key.id, key);
    }
    /** @internal */
    unregisterItem(item) {
      this.itemsById.delete(item.id);
      if (!(item instanceof PluginSubmenu)) {
        return;
      }
      this.menusById.delete(item.menu.id);
      for (const key of item.menu.keys) {
        this.keysById.delete(key.id);
      }
      for (const child of item.menu.items) {
        this.unregisterItem(child);
      }
    }
    /** @internal */
    emitOp(op) {
      if (!this.connected) {
        return;
      }
      const batch = this.batchOps;
      if (!batch) {
        this.send([op]);
        return;
      }
      if (this.carriedByPendingAdd(op)) {
        return;
      }
      if (op.op === UpdateOps.AddItems) {
        for (const node of op.items ?? []) {
          this.pendingItems.add(node.id);
          if (node.menu) {
            this.pendingMenus.add(node.menu.id);
          }
        }
      }
      batch.push(op);
    }
    /** @internal */
    filterChanged(menu) {
      if (!this.connected) {
        return;
      }
      if (!this.batchOps) {
        this.send([menu.filterOp()]);
        return;
      }
      this.markFilterDirty(menu);
    }
    /** @internal */
    emitAdd(menu, item, add) {
      if (!this.connected) {
        return;
      }
      if (this.batchOps) {
        this.emitOp(add);
        if (menu.hasFilter) {
          this.markFilterDirty(menu);
        }
        return;
      }
      const ops = [add];
      if (menu.hides(item)) {
        ops.push({ op: UpdateOps.SetFilter, menuId: menu.id, itemIds: [item.id], flag: true });
      }
      this.send(ops);
    }
    /** @internal */
    mergeTranslations(code, entries) {
      if (this.connected) {
        this.emitOp({ op: UpdateOps.MergeTranslations, language: code, entries });
      }
    }
    endBatch() {
      if (--this.batchDepth > 0) {
        return;
      }
      const ops = this.batchOps;
      if (!ops) {
        return;
      }
      this.batchOps = void 0;
      this.pendingItems.clear();
      this.pendingMenus.clear();
      for (const menu of this.dirtyFilters) {
        ops.push(menu.filterOp());
      }
      this.dirtyFilters.length = 0;
      if (ops.length === 0 || !this.connected) {
        return;
      }
      this.send(ops);
    }
    markFilterDirty(menu) {
      if (!this.dirtyFilters.includes(menu)) {
        this.dirtyFilters.push(menu);
      }
    }
    carriedByPendingAdd(op) {
      if (CarriedItemOps.has(op.op)) {
        return op.itemId !== void 0 && this.pendingItems.has(op.itemId);
      }
      if (CarriedMenuOps.has(op.op)) {
        return op.menuId !== void 0 && this.pendingMenus.has(op.menuId);
      }
      return false;
    }
    send(ops) {
      const payload = ops.map(
        (op) => op.op === UpdateOps.AddItems && op.items ? { ...op, items: op.items.map(PluginMenu.asAdded) } : op
      );
      emitLocal(PluginEvents.Update, JSON.stringify({ ops: payload }));
    }
    ensureHandlers() {
      if (this.handlersRegistered) {
        return;
      }
      this.handlersRegistered = true;
      onLocal(PluginEvents.Ready, () => this.sendRegistration());
      onLocal(PluginEvents.readyFor(this.resource), () => this.sendRegistration());
      onLocal(PluginEvents.registerResultFor(this.resource), (json) => this.onRegisterResult(json));
      onLocal(PluginEvents.eventFor(this.resource), (json) => this.onCallback(json));
      onLocal(PluginEvents.promptResultFor(this.resource), (json) => this.onPromptResult(json));
      onLocal(PluginEvents.themesFor(this.resource), (json) => this.themes.handle(json));
      onLocal("onResourceStop", (stopped) => this.onResourceStop(stopped));
    }
    sendRegistration() {
      emitLocal(PluginEvents.Register, JSON.stringify(this.buildRequest()));
    }
    buildRequest() {
      const request = {
        protocolVersion: PROTOCOL_VERSION,
        displayName: Text.toRef(this.displayName),
        descriptionKey: this.descriptionKey,
        menu: this.rootMenu.node,
        playerActions: this.playerActions.nodes.length > 0 ? this.playerActions.nodes : void 0
      };
      if (Object.keys(this.translations.tables).length > 0) {
        request.translations = this.translations.tables;
      }
      if (this.settings.nodes.length > 0) {
        request.settings = [...this.settings.nodes];
      }
      return request;
    }
    onRegisterResult(json) {
      const result = normalizeResult(parseJson(json));
      if (!result) {
        log.warn(this.resource, "vMenu sent a registration answer that did not parse.");
        return;
      }
      for (const error of result.errors) {
        log.error(this.resource, `vMenu refused the plugin registration: ${error}`);
      }
      for (const warning of result.warnings) {
        log.warn(this.resource, `vMenu accepted the plugin registration with a note: ${warning}`);
      }
      this.connected = result.accepted;
      if (!this.connected) {
        this.cancelPendingPrompts();
      } else {
        this.batch(() => {
          for (const menu of this.menusById.values()) {
            if (menu.hasFilter) {
              this.filterChanged(menu);
            }
          }
        });
      }
      this.resolveFirst?.(result);
      this.resolveFirst = void 0;
      this.registrationAnswered.fire(result);
    }
    onCallback(json) {
      const callback = parseJson(json);
      if (!callback) {
        return;
      }
      try {
        switch (callback.type) {
          case CallbackTypes.MenuOpened:
          case CallbackTypes.MenuClosed:
          case CallbackTypes.MenuIndexChanged: {
            const menu = callback.menuId === void 0 ? void 0 : this.menusById.get(callback.menuId);
            menu?.handleMenu(callback);
            break;
          }
          case CallbackTypes.KeyPressed: {
            const key = callback.keyId === void 0 ? void 0 : this.keysById.get(callback.keyId);
            key?.handle({ item: this.itemOrUndefined(callback.itemId), disabledItem: this.itemOrUndefined(callback.disabledItemId) });
            break;
          }
          default: {
            const item = callback.itemId === void 0 ? void 0 : this.itemsById.get(callback.itemId);
            item?.handle(callback);
            break;
          }
        }
      } catch (error) {
        log.error(this.resource, `A menu callback handler threw: ${describe(error)}`);
      }
    }
    itemOrUndefined(id) {
      return id === void 0 || id === null ? void 0 : this.itemsById.get(id);
    }
    onPromptResult(json) {
      const result = parseJson(json);
      if (!result) {
        return;
      }
      const pending = this.pendingPrompts.get(result.requestId);
      if (pending) {
        this.pendingPrompts.delete(result.requestId);
        pending(result);
      }
    }
    cancelPendingPrompts() {
      for (const pending of this.pendingPrompts.values()) {
        pending({ requestId: 0, cancelled: true, busy: false });
      }
      this.pendingPrompts.clear();
    }
    onResourceStop(stopped) {
      if (typeof stopped !== "string" || stopped.toLowerCase() !== VMENU_RESOURCE.toLowerCase()) {
        return;
      }
      this.connected = false;
      this.cancelPendingPrompts();
      this.disconnected.fire();
    }
  };

  // src/server/declaration.ts
  var ServerPluginDeclaration = class {
    /** @param displayName Used in the generated example files, so owners see which plugin a section belongs to. */
    constructor(displayName) {
      this.displayName = displayName;
      this.permissions = [];
      this.settings = [];
      this.loggedItems = [];
    }
    /** Declares a permission. `staffOnly` marks it as staff only in the generated permissions example. */
    addPermission(name, description, staffOnly = false) {
      this.permissions.push({ name, description, staffOnly });
      return this;
    }
    /**
     * Lets the server owner see a line in their webhook whenever somebody uses this row. The client
     * half still has to set `log` on it. `description` is a noun phrase dropped into vMenu's own
     * wording, as in "turned the anti-grief shield on".
     */
    addLoggedItem(itemId, description) {
      this.loggedItems.push({ itemId, description });
      return this;
    }
    /** Declares an on or off setting. */
    addBoolSetting(name, defaultValue, description) {
      return this.add(name, SettingTypes.Bool, defaultValue ? "true" : "false", description);
    }
    /** Declares a whole number setting. */
    addIntSetting(name, defaultValue, description) {
      return this.add(name, SettingTypes.Int, String(Math.trunc(defaultValue)), description);
    }
    /** Declares a decimal number setting. */
    addFloatSetting(name, defaultValue, description) {
      return this.add(name, SettingTypes.Float, formatFloat(defaultValue), description);
    }
    /** Declares a text setting. */
    addStringSetting(name, defaultValue, description) {
      return this.add(name, SettingTypes.String, defaultValue, description);
    }
    /** @internal */
    toRequest() {
      return {
        protocolVersion: SERVER_PROTOCOL_VERSION,
        displayName: this.displayName,
        permissions: [...this.permissions],
        settings: [...this.settings],
        loggedItems: [...this.loggedItems]
      };
    }
    add(name, type, defaultText, description) {
      this.settings.push({ name, type, default: defaultText, description });
      return this;
    }
  };

  // src/server/server.ts
  var PermissionPrefix = "vMenu.Enhanced.Plugins";
  var Everything = "vMenu.Enhanced.Everything";
  var declaration;
  var firstResult;
  var resolveFirst;
  var handlersRegistered = false;
  var resourceName = "";
  var pluginId = "";
  var registrationAnswered = new Signal(() => resourceName, "registration answered");
  function ensureIdentity() {
    if (resourceName.length === 0) {
      resourceName = currentResource();
      pluginId = sanitizeId(resourceName);
    }
  }
  function sendRegistration() {
    if (declaration) {
      emitLocal(PluginEvents.ServerRegister, JSON.stringify(declaration.toRequest()));
    }
  }
  function onResult(json) {
    const result = normalizeResult(parseJson(json));
    if (!result) {
      log.warn(resourceName, "vMenu sent a registration answer that did not parse.");
      return;
    }
    for (const error of result.errors) {
      log.error(resourceName, `vMenu refused the plugin registration: ${error}`);
    }
    for (const warning of result.warnings) {
      log.warn(resourceName, `vMenu accepted the plugin registration with a note: ${warning}`);
    }
    resolveFirst?.(result);
    resolveFirst = void 0;
    registrationAnswered.fire(result);
  }
  function ensureHandlers() {
    if (handlersRegistered) {
      return;
    }
    handlersRegistered = true;
    ensureIdentity();
    onLocal(PluginEvents.ServerReady, () => sendRegistration());
    onLocal(PluginEvents.serverReadyFor(resourceName), () => sendRegistration());
    onLocal(PluginEvents.serverRegisterResultFor(resourceName), (json) => onResult(json));
  }
  var VMenuServer = {
    /**
     * Declares the plugin with vMenu. The promise resolves on vMenu's first answer, which can be a
     * while when vMenu starts later than the plugin. It never rejects: a refusal arrives as a result
     * with `accepted` false.
     */
    register(pluginDeclaration) {
      declaration = pluginDeclaration;
      firstResult ?? (firstResult = new Promise((resolve) => {
        resolveFirst = resolve;
      }));
      ensureHandlers();
      emitLocal(PluginEvents.ServerProbe);
      return firstResult;
    },
    /**
     * Whether a player holds one of the plugin's own permissions, by its short name. Also honours the
     * container grants a server owner may have used instead of the exact name.
     */
    isPlayerAllowed(playerSource, permissionName) {
      const source = String(playerSource ?? "");
      if (source.length === 0) {
        return false;
      }
      ensureIdentity();
      const scope = `${PermissionPrefix}.${pluginId}`;
      return isAceAllowed(source, `${scope}.${permissionName}`) || isAceAllowed(source, `${scope}.All`) || isAceAllowed(source, `${PermissionPrefix}.All`) || isAceAllowed(source, Everything);
    },
    /**
     * The same check as `isPlayerAllowed`, but a refusal is also reported to vMenu's security webhook.
     * Use it where a legitimate client could only ever have sent the thing you are handling while
     * allowed, and keep `isPlayerAllowed` for ordinary branching.
     */
    requirePermission(playerSource, permissionName) {
      if (VMenuServer.isPlayerAllowed(playerSource, permissionName)) {
        return true;
      }
      const source = String(playerSource ?? "");
      if (source.length > 0) {
        emitLocal(PluginEvents.ServerDenied, source, permissionName);
      }
      return false;
    },
    /** Refreshes permissions for one or more players. Passing no ids refreshes every connected player. */
    refreshPermissions(...serverIds) {
      emitLocal(RefreshPermissionsEvent, serverIds.map((id) => Math.trunc(Number(id))));
    },
    /** Called on every registration answer, including automatic re-registrations. */
    onRegistrationAnswered(handler) {
      return registrationAnswered.add(handler);
    }
  };
  return __toCommonJS(iife_exports);
})();
globalThis.vMenu = vMenu;
