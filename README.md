# Placeholder Search
front-end search component for adding search when prototyping. 

## How to use

Format your data into an array of objects (typical graphql output).

Then import the component found in src/components/Search.js and use as follows:
```jsx

<Search
  placeholder={t("search-placeholder")}
  lang={i18n.language}
  data={[
    {en: "Apple", fr: "Pomme", out: "A"},
    {en: "Orange", fr: "Orange", out: "B"},
    {en: "Potato", fr: "Pomme-de-terre", out: "C"},
    {en: "Cake", fr: "Gâteau", out: "D"},
    {en: "Watermelon", fr: "Melon d'eau", out: "E"},
  ]}
  englishKey="en"
  frenchKey="fr"
  outputKey="out"
/>
```

## GraphQL example

You can pair this with apollo client to generate a search from your query:

```jsx

const MY_QUERY = gql`
  {
    users {
      id
      nameEN
      nameFR
    }
  }
`;

<Query query={ MY_QUERY }>
  {
    ({ loading, error, data }) => {
      if (loading) return (<Spinner color="primary" />);
      if (error) { 
        
        return null;
      }
      if (data) {
        if (!data.users || data.users.length < 1) throw new Error("Query aint got anything in it");
        return(
          <Search
            placeholder={t("search-placeholder")}
            lang={i18n.language}
            data={data.users}
            englishKey="nameEN"
            frenchKey="nameFR"
            outputKey="id"
          />
      } else {
        
        return(null);
      }
    }
  }
</Query>
```
