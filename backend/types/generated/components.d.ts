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

export interface BasicImage extends Struct.ComponentSchema {
  collectionName: 'components_basic_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    imageItem: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface ServiceItemServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_service_item_service_items';
  info: {
    description: '';
    displayName: 'service-item';
  };
  attributes: {
    Content: Schema.Attribute.Blocks;
    Description: Schema.Attribute.Text;
    examples: Schema.Attribute.Component<'basic.image', true>;
    Time: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.contact': AboutContact;
      'basic.image': BasicImage;
      'service-item.service-item': ServiceItemServiceItem;
    }
  }
}
