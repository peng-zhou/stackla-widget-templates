import { createElement, createFragment } from "@stackla/widget-utils/jsx"
import { IProductsComponent, ISdk, Sdk, TagExtended } from "@stackla/widget-utils/types"

export function ProductHeader({ product }: { product: TagExtended }) {
  if (!product) return <></>

  const { id, tag, custom_url, target, price, currency } = product

  const titleContent = tag && (
    <a href={custom_url} target={target} class="stacklapopup-products-item-title">
      {tag}
    </a>
  )

  const priceContent = price && (
    <div class="stacklapopup-products-item-price">{currency === "EUR" ? `${price}` : `${currency ?? ""}${price}`}</div>
  )

  return (
    <div class="stacklapopup-products-header">
      <div class="stacklapopup-products-item-header stacklapopup-products-item-active" data-tag-id={id}>
        {titleContent}
        {priceContent}
      </div>
    </div>
  )
}

export function ProductCTA({ sdk, product }: { sdk: ISdk; product: TagExtended }) {
  const { custom_url, target, availability, cta_text = "Buy Now", currency, id } = product
  const addToCart = sdk.getLoadedComponents().includes("add-to-cart")
  const parentNodeId = sdk.getNodeId()
  if (addToCart) {
    return (
      <>
        <a
          href={custom_url}
          target={target}
          class="stacklapopup-products-item-button-wrap"
          style={{
            display: "none"
          }}>
          <span className={`stacklapopup-products-item-button${availability ? "" : " disabled"}`}>{cta_text}</span>
        </a>
        <add-to-cart
          productId={id}
          id={`stacklapopup-add-to-cart-${id}`}
          url={custom_url}
          target={target}
          availability={availability}
          cta={cta_text}
          currency={currency}
          parent={parentNodeId}></add-to-cart>
      </>
    )
  }

  return (
    <a href={custom_url} target={target} class="stacklapopup-products-item-button-wrap">
      <span className={`stacklapopup-products-item-button${availability ? "" : " disabled"}`}>{cta_text}</span>
    </a>
  )
}

export function ProductDetails({ sdk, product }: { sdk: Sdk; product: TagExtended }) {
  const selectedProductId = sdk.tiles.getSelectedProduct() ? sdk.tiles.getSelectedProduct().id : null
  const { custom_url, description = "Buy Now", id } = product

  const descriptionContent = description ? <p class="stacklapopup-products-item-description">{description}</p> : <></>

  const itemActive = id == selectedProductId ? "stacklapopup-products-item-active" : ""

  return (
    <div className={`stacklapopup-products-item-content ${itemActive}`} data-tag-id={id} data-custom-url={custom_url}>
      <div className="stacklapopup-products-item-description-wrapper">{descriptionContent}</div>
      <ProductCTA sdk={sdk} product={product}></ProductCTA>
    </div>
  )
}

export function ProductWrapper({
  products,
  selectedProductId
}: {
  products: TagExtended[]
  selectedProductId: string
}) {
  return (
    <>
      {products.map(({ id, image_small_url, is_cross_seller }) => (
        <div className="swiper-slide stacklapopup-product-wrapper">
          {is_cross_seller && (
            <div className="stacklapopup-products-item-image-recommendation-label">
              <p>
                <span class="icon-like"></span> great with
              </p>
            </div>
          )}
          <div
            className={`stacklapopup-products-item ${is_cross_seller ? "cross-seller" : ""} ${id == selectedProductId ? "stacklapopup-products-item-active" : ""}`}
            data-tag-id={id}>
            <img
              loading="lazy"
              class="stacklapopup-products-item-image"
              src={image_small_url}
              onerror="this.src='https://placehold.co/160x200'"
            />
          </div>
        </div>
      ))}
    </>
  )
}

export function ProductImages({
  products,
  selectedProduct
}: {
  products: TagExtended[]
  selectedProduct: TagExtended
}) {
  return (
    <>
      {products.length > 3 ? <div class="recommendations-text">see recommendations</div> : <></>}
      <div class="stacklapopup-product-images-wrapper">
        <div class="swiper swiper-expanded-product-recs stacklapopup-products">
          <div class="swiper-wrapper">
            {selectedProduct && (
              <ProductWrapper products={products} selectedProductId={selectedProduct.id}></ProductWrapper>
            )}
          </div>
        </div>
        <div class="swiper-exp-product-recs-button-prev swiper-button-prev">
          <span class="swiper-nav-icon icon-prev color-blue" />
        </div>
        <div class="swiper-exp-product-recs-button-next swiper-button-next">
          <span class="swiper-nav-icon icon-next color-blue" />
        </div>
      </div>
    </>
  )
}

export default function ProductsTemplate(sdk: Sdk, component?: IProductsComponent) {
  const tileId = component && component.getTileId()
  const tile = sdk.tiles.getTile(tileId)
  const selectedProductState = sdk.tiles.getSelectedProduct()

  if (!tile) {
    throw new Error("No tile found")
  }

  const products: TagExtended[] = (tile.tags_extended || []).filter(({ type }) => type === "product")

  if (!products.length) {
    return <></>
  }

  const selectedProductById = selectedProductState
    ? products.find(({ id }) => id == selectedProductState.id.toString())
    : null

  const selectedProduct: TagExtended = selectedProductById || products[0]
  const mappedProducts = products.map(product => <ProductDetails sdk={sdk} product={product}></ProductDetails>)

  return (
    <>
      <ProductHeader product={selectedProduct}></ProductHeader>
      <ProductImages products={products} selectedProduct={selectedProduct}></ProductImages>
      {mappedProducts}
    </>
  )
}
