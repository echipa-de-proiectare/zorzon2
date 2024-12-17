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

export interface DashboardPhaseItem extends Struct.ComponentSchema {
  collectionName: 'components_dashboard_phase_items';
  info: {
    description: '';
    displayName: 'phase-item';
  };
  attributes: {
    available: Schema.Attribute.Boolean;
    document: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.contact': AboutContact;
      'dashboard.phase-item': DashboardPhaseItem;
      'dashboard.project-phase': DashboardProjectPhase;
    }
  }
}
