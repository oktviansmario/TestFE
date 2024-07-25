import gql from 'graphql-tag';

// CRUD gql queries for category
export const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!) {
    insert_categories(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: Int!) {
    delete_categories(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Int!, $name: String!, $price: Float!) {
    update_products(where: { id: { _eq: $id } }, _set: { name: $name, price: $price }) {
      returning {
        id
        name
        price
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    delete_products(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
