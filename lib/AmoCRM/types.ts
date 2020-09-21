interface IAmoCRMConfig {
  subdomain: string;
  integrationId: string;
  integrationSecret: string;
  integrationRedirectUri: string;
  accessToken: string;
  refreshToken: string;
  goodsCatalogId: string;
}

interface IAmoCRMDatePattern {
  date: string;
  time: string;
  date_time: string;
  time_full: string;
}

interface IAmoCRMUserRights {
  mail: string;
  incoming_leads: string;
  catalogs: string;
  lead_add: string;
  lead_view: string;
  lead_edit: string;
  lead_delete: string;
  lead_export: string;
  contact_add: string;
  contact_view: string;
  contact_edit: string;
  contact_delete: string;
  contact_export: string;
  company_add: string;
  company_view: string;
  company_edit: string;
  company_delete: string;
  company_export: string;
  task_edit: string;
  task_delete: string;
  by_status?: any;
}

interface IAmoCRMUser {
  id: number;
  name: string;
  last_name: string;
  login: string;
  language: string;
  group_id: number;
  is_active: boolean;
  is_free: boolean;
  is_admin: boolean;
  phone_number: string;
  rights: IAmoCRMUserRights;
}

interface IAmoCRMValueTree {
  id: number;
  value: string;
  depth: number;
}

interface IAmoCRMCustomField {
  id: number;
  name?: string;
  field_type?: number;
  sort?: number;
  code?: string;
  values?: any[] | { [key: string]: any }[];
  is_multiple?: boolean;
  is_system?: boolean;
  is_editable?: boolean;
  is_required?: boolean;
  is_deletable?: boolean;
  is_visible?: boolean;
  params?: any;
  enums?: { [key: string]: string };
  values_tree?: IAmoCRMValueTree[];
}

interface IAmoCRMCustomFields {
  contacts: { [key: string]: IAmoCRMCustomField };
  leads: { [key: string]: IAmoCRMCustomField };
  companies: { [key: string]: IAmoCRMCustomField };
  customers: any;
  catalogs: { [key: string]: { [key: string]: IAmoCRMCustomField } };
}

interface IAmoCRMNoteType {
  id: number;
  code: string;
  is_editable: boolean;
}

interface IAmoCRMGroup {
  id: number;
  name: string;
}

interface IAmoCRMTaskType {
  id: number;
  name: string;
  color: any;
  icon_id: number;
}

interface IAmoCRMPipelineStatus {
  id: number;
  name: string;
  color: string;
  sort: number;
  is_editable: boolean;
}

interface IAmoCRMPipeline {
  id: number;
  name: string;
  sort: number;
  is_main: boolean;
  statuses: { [key: string]: IAmoCRMPipelineStatus };
}

interface IAmoCRMAccountEmbedded {
  users?: { [key: string]: IAmoCRMUser };
  custom_fields?: IAmoCRMCustomFields;
  note_types?: { [key: string]: IAmoCRMNoteType };
  groups?: { [key: string]: IAmoCRMGroup };
  task_types?: { [key: string]: IAmoCRMTaskType };
  pipelines?: { [key: string]: IAmoCRMPipeline };
}

interface IAmoCRMAccount {
  id: number;
  name: string;
  subdomain: string;
  currency: string;
  timezone: string;
  timezone_offset: string;
  language: string;
  date_pattern: IAmoCRMDatePattern;
  current_user: number;
  _embedded: IAmoCRMAccountEmbedded;
}

interface IAmoCRMCatalogElementLeads {
  id: number[];
  _links: any;
}

interface IAmoCRMCatalogElement {
  id: number;
  name: string;
  created_by: number;
  created_at: number;
  updated_at: number;
  updated_by: number;
  is_deleted: boolean;
  custom_fields: IAmoCRMCustomField[];
  leads: IAmoCRMCatalogElementLeads;
  customers: any;
  catalog_id: number;
  _links: any;
}

interface IAmoCRMDeal {
  name: string;
  created_at: number;
  updated_at: number;
  status_id?: number;
  pipeline_id?: number;
  responsible_user_id: number;
  sale: number;
  tags?: string | string[];
  contacts_id?: number | number[];
  company_id: number;
  catalog_elements_id?: { [key: number]: any };
  custom_fields?: IAmoCRMCustomField[];
}

interface IAmoCRMTokens {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export {
  IAmoCRMConfig,
  IAmoCRMAccount,
  IAmoCRMCatalogElement,
  IAmoCRMDeal,
  IAmoCRMPipeline,
  IAmoCRMCustomField,
  IAmoCRMCustomFields,
  IAmoCRMTokens,
};
