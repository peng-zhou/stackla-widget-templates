import {EmptyTile, TagExtended, Tile} from "./tile";

type WidgetService = {
    setSdk: (sdk: Sdk) => void;
}

type Placement = {
    getTilesService: () => TilesService;
    querySelector: (selector: string) => Element | null;
    querySelectorAll: (selector: string) => NodeListOf<Element>;
}

type EventService = {
    getUniqueSelector: () => string;
}

type TilesService = {
    page: number;
    visibleTilesCount: number;
    tiles: Record<string, Tile | EmptyTile>;
    loadMode: 'all' | 'page';
    selectedProductId?: string;
    hideBrokenTiles: boolean;
    preloadImages: boolean;

    getTotalTilesCount(): number;

    setLoadMode(loadMode: 'all' | 'page'): void;

    setVisibleTilesCount(visibleTilesCount: number): void;

    postRender(): Promise<void>;

    loadMoreTilesIfNeeded(): Promise<boolean>;

    reload(): Promise<void>;

    loadMore(): Promise<void>;

    loadLess(): Promise<void>;

    almostOutOfTiles(): Promise<boolean>;

    searchTiles(query: string): Promise<any[]>;

    fetchAllTiles(): Promise<any>;

    fetchTile(tileId: string): Promise<Tile>;

    hasMorePages(): boolean;

    hasLessPages(): boolean;

    getLoadedTilesCount(): number;

    getPage(): number;

    setTile(tile: Tile): void;

    clearTile(): void;

    getTile(): Tile | undefined;

    getProductsFromTile(): TagExtended[];

    getProductById(productId: string): TagExtended | undefined;

    getSelectedProduct(): TagExtended | undefined;

    setSelectedProductId(productId: string): void;

    addProducts(products: TagExtended[]): void;

    getShopspotsFromTile(): TagExtended[];
}

/**
 * @remarks
 * The SDK class is the main class that is used to interact with the UGC widget
 * It provides methods to interact with the widget, placement, events, and tiles
 * It is automatically instantiated when the widget is loaded and can be accessed in the code editor
 */
export default interface Sdk {
    widget: WidgetService;
    placement: Placement;
    events: EventService;
    tiles: TilesService;

    /**
     * @remarks
     * Allows retrieval of one element inside the widget placement
     * @example
     * sdk.querySelector('.ugc-tile')
     * @param selector
     */
    querySelector(selector: string): Element | null;

    /**
     * @remarks
     * Allows retrieval of elements inside the widget placement
     * @example
     * sdk.querySelectorAll('.ugc-tile')
     * @param selector
     */
    querySelectorAll(selector: string): NodeListOf<Element>;

    /**
     * @remarks
     * Returns the list of events that have been emitted
     * @example
     * sdk.getEmittedEvents()
     * @returns {string[]} - returns ['moreLoad', 'lessLoad']
     */
    getEmittedEvents(): string[];

    getRegisteredEvents(): string[];

    /**
     * @remarks
     * Allows the addition of event listeners to the widget
     * @example
     * sdk.addEventListener('loadMore', (event) => console.log(event), document.querySelectorAll('.load-more'))
     * @param event
     * @param callback
     * @param htmlSelector
     */
    addEventListener(event: string, callback: (event: Event) => void, htmlSelector?: NodeListOf<Element> | Element): void;

    /**
     * @remarks
     * Allows particular events to be triggered to operate when a listener is called
     * @example
     * sdk.triggerEvent('loadMore', { data: 'data' })
     * @param event
     * @param data
     */
    triggerEvent(event: string, data?: any): void;

    /**
     * @remarks
     * Allow loading of local UGC components or third-party components
     * @example
     * sdk.addLoadedComponents(['shopspots']) or sdk.loadComponents(['https://goog.com/component-name.js'])
     * @param components
     */
    addLoadedComponents(components: string[]): void;

    /**
     * @remarks
     * Get loaded components
     * @example
     * sdk.getLoadedComponents() - returns ['shopspots']
     * @returns {string[]}
     */
    getLoadedComponents(): string[];

    isComponentLoaded(component: string): boolean;

    /**
     * @remarks
     * Allows the addition of global CSS to the widget
     * @example
     * sdk.addGlobalCSSUrl('https://goog.com/component-name.css')
     * @param url
     */
    addGlobalCSSUrl(url: string): void;

    /**
     * @remarks
     * Allows the addition of CSS to a particular component
     * This allows for custom styling of components
     * @example
     * sdk.addCSSToComponent('.class{color: red}', 'componentName')
     * @param css
     * @param componentName
     */
    addCSSToComponent(css: string, componentName: string): void;

    /**
     * @remarks
     * Allows the addition of a template to a particular component
     * This allows for templating of components
     * @example
     * sdk.addTemplateToComponent((context) => `<div>${context.title}</div>`, 'componentName')
     * @param template
     * @param componentName
     */
    addTemplateToComponent(template: (sdk: Sdk) => string, componentName: string): void;

    /**
     * @remarks
     * Add a value to a given key to be stored in globals
     * @example
     * sdk.setState('key', 'value')
     * @param key
     * @param value
     */
    setState(key: string, value: any): void;

    /**
     * @remarks
     * Get a value from a given key stored in globals
     * @example
     * sdk.getState('key')
     * @param key
     */
    getState(key: string): any;

    /**
     * @remarks
     * Get the node id of the placement in use. This is helpful when accessing the placement in the ugc globals
     * @example
     * const widget = window.ugc.getWidgetBySelector(sdk.getNodeId())
     * @returns {string}
     */
    getNodeId(): string;
}
