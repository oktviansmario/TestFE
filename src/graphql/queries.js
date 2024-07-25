import gql from 'graphql-tag';

// gql query for getting the categories data
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
       subcategories {
        id
        name
      }
      products {
        id
        name
        price
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: Int!) {
    category(id: $id) {
      id
      name
      subcategories {
        id
        name
      }
      products {
        id
        name
        price
      }
    }
  }
`;
