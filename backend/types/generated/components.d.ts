import type { Schema, Struct } from '@strapi/strapi';

export interface AboutContact extends Struct.ComponentSchema {
  collectionName: 'components_about_contacts';
  info: {
    description: '';
    displayName: 'contact';
  };
  attributes: {
    link: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface DashboardDocumentItem extends Struct.ComponentSchema {
  collectionName: 'components_dashboard_document_items';
  info: {
    description: '';
    displayName: 'document-item';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    document: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.Required;
    modelurl: Schema.Attribute.String;
    ReviewDate: Schema.Attribute.Date & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['model', 'document']> &
      Schema.Attribute.Required;
  };
}

export interface DashboardPhaseItem extends Struct.ComponentSchema {
  collectionName: 'components_dashboard_phase_items';
  info: {
    description: '';
    displayName: 'phase-item';
  };
  attributes: {
    available: Schema.Attribute.Boolean;
    DocumentItem: Schema.Attribute.Component<'dashboard.document-item', true>;
    name: Schema.Attribute.String;
  };
}

export interface DashboardProjectPhase extends Struct.ComponentSchema {
  collectionName: 'components_dashboard_project_phases';
  info: {
    description: '';
    displayName: 'project-phase';
  };
  attributes: {
    item: Schema.Attribute.Component<'dashboard.phase-item', true>;
    name: Schema.Attribute.String;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['LINK', 'PRIMARY', 'SECONDARY']>;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    about: Schema.Attribute.Text;
    contact: Schema.Attribute.Component<'elements.link', true>;
  };
}

export interface LayoutTopNavigation extends Struct.ComponentSchema {
  collectionName: 'components_layout_top_navigations';
  info: {
    displayName: 'Top Navigation';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    logoTitle: Schema.Attribute.Component<'elements.link', false>;
    navItems: Schema.Attribute.Component<'elements.link', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.contact': AboutContact;
      'dashboard.document-item': DashboardDocumentItem;
      'dashboard.phase-item': DashboardPhaseItem;
      'dashboard.project-phase': DashboardProjectPhase;
      'elements.link': ElementsLink;
      'layout.footer': LayoutFooter;
      'layout.top-navigation': LayoutTopNavigation;
    }
  }
}
