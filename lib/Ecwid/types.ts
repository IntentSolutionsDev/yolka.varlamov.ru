interface IEcwidConfig {
  storeId: string;
  secretToken: string;
}

interface IEcwidStarterSite {
  ecwidSubdomain: string;
  generatedUrl: string;
  storeLogoUrl: string;
}

interface IEcwidGeneralInfo {
  storeId: number;
  storeUrl: string;
  starterSite: IEcwidStarterSite;
}

interface IEcwidAccount {
  accountName: string;
  accountNickName: string;
  accountEmail: string;
  whiteLabel: boolean;
  suspended: boolean;
  itunesSubscriptionsAvailable: boolean;
  availableFeatures: string[];
}

interface IEcwidAbandonedSales {
  autoAbandonedSalesRecovery: boolean;
}

interface IEcwidSalePrice {
  displayOnProductList: boolean;
  oldPriceLabel: string;
  displayDiscount: string;
}

interface IEcwidSettings {
  closed: boolean;
  storeName: string;
  invoiceLogoUrl: string;
  emailLogoUrl: string;
  googleRemarketingEnabled: boolean;
  orderCommentsEnabled: boolean;
  orderCommentsCaption: string;
  orderCommentsRequired: boolean;
  hideOutOfStockProductsInStorefront: boolean;
  askCompanyName: boolean;
  favoritesEnabled: boolean;
  defaultProductSortOrder: string;
  abandonedSales: IEcwidAbandonedSales;
  salePrice: IEcwidSalePrice;
  showAcceptMarketingCheckbox: boolean;
  acceptMarketingCheckboxDefaultValue: boolean;
  askConsentToTrackInStorefront: boolean;
  wixExternalTrackingEnabled: boolean;
}

interface IEcwidMailNotifications {
  adminNotificationEmails: string[];
  customerNotificationFromEmail: string;
}

interface IEcwidCompany {
  companyName: string;
  email: string;
  street: string;
  city: string;
  countryCode: string;
  postalCode: string;
  stateOrProvinceCode: string;
  phone: string;
}

interface IEcwidFormatsAndUnits {
  currency: string;
  currencyPrefix: string;
  currencySuffix: string;
  currencyGroupSeparator: string;
  currencyDecimalSeparator: string;
  currencyPrecision: number;
  currencyTruncateZeroFractional: boolean;
  currencyRate: number;
  weightUnit: string;
  weightGroupSeparator: string;
  weightDecimalSeparator: string;
  weightTruncateZeroFractional: boolean;
  timeFormat: string;
  dateFormat: string;
  timezone: string;
  dimensionsUnit: string;
  orderNumberPrefix: string;
  orderNumberSuffix: string;
}

interface IEcwidLanguages {
  enabledLanguages: string[];
  facebookPreferredLocale: string;
  defaultLanguage: string;
}

interface IEcwidHandlingFee {
  value: number;
}

interface IEcwidShippingOrigin {
  companyName: string;
  street: string;
  city: string;
  countryCode: string;
  countryName: string;
  postalCode: string;
  stateOrProvinceCode: string;
  phone: string;
}

interface IEcwidDestinationZone {
  id: string;
  name: string;
  countryCodes: string[];
  stateOrProvinceCodes: string[];
  postCodes: any[];
}

interface IEcwidFlatRate {
  rateType: string;
  rate: number;
}

interface IEcwidShippingOption {
  id: string;
  title: string;
  enabled: boolean;
  orderby: number;
  destinationZone: IEcwidDestinationZone;
  fulfilmentType: string;
  ratesCalculationType: string;
  ratesTable: any;
  deliveryTimeDays: string;
  carrier: string;
  description: string;
  pickupInstruction: string;
  scheduledPickup?: boolean;
  pickupPreparationTimeHours?: number;
  pickupBusinessHours: string;
  flatRate: IEcwidFlatRate;
}

interface IEcwidShipping {
  handlingFee: IEcwidHandlingFee;
  shippingOrigin: IEcwidShippingOrigin;
  shippingOptions: IEcwidShippingOption[];
}

interface IEcwidZone {
  id: string;
  name: string;
  countryCodes: string[];
  stateOrProvinceCodes: string[];
  postCodes: any[];
}

interface IEcwidTaxSettings {
  automaticTaxEnabled: boolean;
  taxes: any[];
}

interface IEcwidInstructionsForCustomer {
  instructionsTitle: string;
  instructions: string;
}

interface IEcwidPaymentOption {
  id: string;
  enabled: boolean;
  checkoutTitle: string;
  paymentProcessorId: string;
  paymentProcessorTitle: string;
  orderBy: number;
  appClientId: string;
  instructionsForCustomer: IEcwidInstructionsForCustomer;
}

interface IEcwidApplePay {
  enabled: boolean;
  available: boolean;
}

interface IEcwidPayment {
  paymentOptions: IEcwidPaymentOption[];
  applePay: IEcwidApplePay;
}

interface IEcwidFeatureToggle {
  name: string;
  visible: boolean;
  enabled: boolean;
}

interface IEcwidLegalPage {
  type: string;
  enabled: boolean;
  title: string;
  display: string;
  text: string;
  externalUrl: string;
}

interface IEcwidLegalPagesSettings {
  requireTermsAgreementAtCheckout: boolean;
  legalPages: IEcwidLegalPage[];
}

interface IEcwidDesignSettings {
  product_list_image_size: string;
  product_list_image_aspect_ratio: string;
  product_list_product_info_layout: string;
  product_list_show_frame: boolean;
  product_list_show_additional_image_on_hover: boolean;
  product_list_title_behavior: string;
  product_list_price_behavior: string;
  product_list_sku_behavior: string;
  product_list_buybutton_behavior: string;
  product_list_category_title_behavior: string;
  product_list_image_has_shadow: boolean;
  show_signin_link: boolean;
  show_footer_menu: boolean;
  show_breadcrumbs: boolean;
  product_list_show_sort_viewas_options: boolean;
  product_filters_position_search_page: string;
  product_filters_position_category_page: string;
  product_filters_opened_by_default_on_category_page: boolean;
  product_details_show_product_sku: boolean;
  product_details_layout: string;
  product_details_two_columns_with_right_sidebar_show_product_description_on_sidebar: boolean;
  product_details_two_columns_with_left_sidebar_show_product_description_on_sidebar: boolean;
  product_details_show_product_name: boolean;
  product_details_show_breadcrumbs: boolean;
  product_details_show_product_price: boolean;
  product_details_show_sale_price: boolean;
  product_details_show_tax: boolean;
  product_details_show_product_description: boolean;
  product_details_show_product_options: boolean;
  product_details_show_wholesale_prices: boolean;
  product_details_show_save_for_later: boolean;
  product_details_show_share_buttons: boolean;
  product_details_position_product_name: number;
  product_details_position_breadcrumbs: number;
  product_details_position_product_sku: number;
  product_details_position_product_price: number;
  product_details_position_product_options: number;
  product_details_position_buy_button: number;
  product_details_position_wholesale_prices: number;
  product_details_position_product_description: number;
  product_details_position_save_for_later: number;
  product_details_position_share_buttons: number;
  product_details_show_price_per_unit: boolean;
  product_details_show_qty: boolean;
  product_details_show_in_stock_label: boolean;
  product_details_show_number_of_items_in_stock: boolean;
  product_details_gallery_layout: string;
}

interface IEcwidProductFiltersSettings {
  enabledInStorefront: boolean;
}

interface IEcwidOrderInvoiceSettings {
  invoiceLogoUrl: string;
}

interface IEcwidProfile {
  generalInfo: IEcwidGeneralInfo;
  account: IEcwidAccount;
  settings: IEcwidSettings;
  mailNotifications: IEcwidMailNotifications;
  company: IEcwidCompany;
  formatsAndUnits: IEcwidFormatsAndUnits;
  languages: IEcwidLanguages;
  shipping: IEcwidShipping;
  zones: IEcwidZone[];
  taxes: any[];
  taxSettings: IEcwidTaxSettings;
  payment: IEcwidPayment;
  featureToggles: IEcwidFeatureToggle[];
  legalPagesSettings: IEcwidLegalPagesSettings;
  designSettings: IEcwidDesignSettings;
  productFiltersSettings: IEcwidProductFiltersSettings;
  orderInvoiceSettings: IEcwidOrderInvoiceSettings;
}

interface IEcwidDimensions {
  length: number;
  width: number;
  height: number;
}

interface IEcwidOrderItem {
  id: number;
  productId: number;
  categoryId: number;
  price: number;
  productPrice: number;
  sku: string;
  quantity: number;
  shortDescription?: string;
  shortDescriptionTranslated?: { [key: string]: string };
  tax: number;
  shipping: number;
  quantityInStock: number;
  name: string;
  nameTranslated?: { [key: string]: string };
  isShippingRequired: boolean;
  weight?: number;
  trackQuantity: boolean;
  fixedShippingRateOnly: boolean;
  imageUrl?: string;
  smallThumbnailUrl?: string;
  hdThumbnailUrl?: string;
  fixedShippingRate: number;
  digital: boolean;
  productAvailable: boolean;
  couponApplied: boolean;
  dimensions?: IEcwidDimensions;
  discounts: any[];
}

interface IEcwidShippingPerson {
  name: string;
  companyName?: string;
  street: string;
  city: string;
  countryCode: string;
  countryName: string;
  postalCode?: string;
  stateOrProvinceCode: string;
  stateOrProvinceName: string;
  phone?: string;
}

interface IEcwidOrderShippingOption {
  shippingMethodName: string;
  shippingRate: number;
  estimatedTransitTime?: string;
  isPickup: boolean;
}

interface IEcwidHandlingFee {
  value: number;
}

interface IEcwidAdditionalInfo {
  google_customer_id: string;
}

type IEcwidPaymentStatus =
  | "AWAITING_PAYMENT"
  | "PAID"
  | "CANCELLED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED"
  | "INCOMPLETE";

interface IEcwidOrder {
  vendorOrderNumber: string;
  refundedAmount: number;
  subtotal: number;
  total: number;
  giftCardRedemption: number;
  totalBeforeGiftCardRedemption: number;
  email: string;
  paymentMethod: string;
  tax: number;
  customerTaxExempt?: boolean;
  customerTaxId?: string;
  customerTaxIdValid?: boolean;
  reversedTaxApplied?: boolean;
  ipAddress: string;
  couponDiscount: number;
  discountCoupon?: any;
  paymentStatus: IEcwidPaymentStatus;
  fulfillmentStatus: string;
  orderNumber: number;
  refererUrl: string;
  orderComments: string;
  volumeDiscount: number;
  customerId: number;
  membershipBasedDiscount: number;
  totalAndMembershipBasedDiscount: number;
  customDiscount: any[];
  discount: number;
  usdTotal: number;
  globalReferer: string;
  createDate: string;
  updateDate: string;
  createTimestamp: number;
  updateTimestamp: number;
  items: IEcwidOrderItem[];
  refunds: any[];
  shippingPerson: IEcwidShippingPerson;
  shippingOption: IEcwidOrderShippingOption;
  handlingFee: IEcwidHandlingFee;
  predictedPackage: any[];
  additionalInfo: IEcwidAdditionalInfo;
  paymentParams: { [key: string]: any };
  extraFields: { [key: string]: any };
  hidden: boolean;
  taxesOnShipping: any[];
  acceptMarketing?: boolean;
}

interface IEcwidWebhookBody {
  eventId: string;
  eventCreated: number;
  storeId: number;
  entityId: number;
  eventType: string;
  data?: any;
}

interface IEcwidOrdersRequest {
  offset?: number;
  limit?: number;
  keywords?: string;
  couponCode?: string;
  totalFrom?: number;
  totalTo?: number;
  orderNumber?: number;
  vendorOrderNumber?: string;
  email?: string;
  customerId?: number;
  createdFrom?: number;
  createdTo?: number;
  updatedFrom?: number;
  updatedTo?: number;
  paymentMethod?: string;
  shippingMethod?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  acceptMarketing?: boolean;
  refererId?: string;
  productId?: number;
}

interface IEcwidPaginatedResponse<T> {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: T[];
}

type IEcwidOrdersResponse = IEcwidPaginatedResponse<IEcwidOrder>;

interface IEcwidProduct {
  id: number;
  sku: string;
  thumbnailUrl: string;
  quantity: number;
  unlimited: boolean;
  inStock: boolean;
  name: string;
  price: number;
  priceInProductList: number;
  defaultDisplayedPrice: number;
  defaultDisplayedPriceFormatted: string;
  tax: any;
  isShippingRequired: boolean;
  weight: number;
  url: string;
  created: string;
  updated: string;
  createTimestamp: number;
  updateTimestamp: number;
  productClassId: number;
  enabled: boolean;
  options: any[];
  warningLimit: number;
  fixedShippingRateOnly: boolean;
  fixedShippingRate: number;
  shipping: any;
  defaultCombinationId: number;
  imageUrl: string;
  smallThumbnailUrl: string;
  hdThumbnailUrl: string;
  originalImageUrl: string;
  originalImage: any;
  borderInfo: any;
  description: string;
  galleryImages: any[];
  media: any;
  categoryIds: any[];
  categories: any[];
  defaultCategoryId: number;
  seoTitle: string;
  seoDescription: string;
  attributes: any[];
  files: any[];
  relatedProducts: any;
  combinations: any[];
  dimensions: any;
  showOnFrontpage: number;
  isSampleProduct: boolean;
  googleItemCondition: string;
}

export {
  IEcwidConfig,
  IEcwidOrder,
  IEcwidOrderItem,
  IEcwidProfile,
  IEcwidWebhookBody,
  IEcwidOrdersRequest,
  IEcwidOrdersResponse,
  IEcwidProduct,
};
