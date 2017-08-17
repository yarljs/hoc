import React from 'react';

let Renderers = [];

function Atomizer(classifier, renderer, label="") {
  Renderers.push({
    classifier,
    renderer,
    label
  });
}

function defaultRenderer(name, data, styleMap) {
  return (
    <span className={`${name} ${styleMap.atom}`}>
      {data || ""}
    </span>
  )
}

function test(name, data, threshhold=.5) {
  const res = Renderers.map((e, i) => {
    const match = e.classifier(name, data);
    if(match >= threshhold )
    {
      return {
        match,
        renderer: e.renderer
      }
    }
  }).filter((e, i) => {
    return e !== undefined
  }).sort((a, b) => {return a > b;});

  return (res.length != 0) ? res : [{match: -1.0, renderer: defaultRenderer}]
}

export {
  defaultRenderer,
  Atomizer,
  test
}
