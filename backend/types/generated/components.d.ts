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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.contact': AboutContact;
    }
  }
}
