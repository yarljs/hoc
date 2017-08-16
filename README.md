# hoc
Higher Order React Components

## install
```
yarn install @yarljs/hoc
```

## Usage


### Fetchable
Fetchable is a HOC which maps a fetch action to a component.
It is used to handle a common pattern when pulling down async data:

```dot
Start->Loading
Loading->Data
Loading->Error
```

Fetchable takes a ```@yarljs/fetch``` Redux action and
two optional parameters to forward to the action invoke:
```params```, and ```transform```, which map input and output data from the fetch request respectively. The resulting React Component can then be given components for
Data, Loading, and Error states:
```js

const Container = Fetchable(
  yarlFetch.fetching("http://localhost:8081/chuck/jokes/categories",
      "getChuckStuff",
      {method: "GET"}
    ),
  {some: "params"}, undefined)


const TestData = ({data}) => {
  return (
    <div>
      Some Data
    </div>
  );
}

const TestError = ({error}) => {
  return (
    <div>
      Uh Oh: {error.toString()}
    </div>
  );
}

const TestLoading = ({loading}) => {
  return (
    <div>
      Loading...
    </div>
  );
}

const Root = () => {
  return (
    <Provider store={store}>
      <Container
        Data={TestData}
        Loader={TestLoader}
        Error={TestError}
      />
    </Provider>
  );
}
```

#### Default Render
If no components are passed to the Resulting Container,
default html will be generated for the result of the query.
This can be useful for rapid, and can even work in production if
you intend to render content that doesn't need extensive user interaction. The Default renderer works by inspecting the shape of the
data param at runtime, and generating sensible divs and css class names. For Example, a query named `justiceleague` which returned a simple list of superhero names would generate the following html:

```html
<div className="justiceleague container">
  <div class="justiceleague data container">
    <ul class="justiceleague data list">
      <li class="justiceleague data item">Superman</li>
      <li class="justiceleague data item">Batman</li>
    </ul>
  </div>
</div>
```

**Error** and **Loading** states produce a similar layout.

This
system is particularly useful for APIs described by systems like JSONAPI, Swagger, and GraphQL, where the Model describing the shape of the JSON data leads to meaningful names for data fields. While such
a system may seem a regression to Web 1.0 style development, there is
an important distinction:
*these classic systems rendered content on the sever*. Combined with
a simple HTTP proxy, the autorenderer can aggregate data from multiple
backends, leaving only styling to the user.

## Caveats
* Currently the default renderer produces HTML, which means ReactNative apps can't make use of such a system. While the XML itself
is easily replaceable with the default ReactNative components, more work will be needed to cascade styling down to components, as ReactNative has no support for traditional CSS.
