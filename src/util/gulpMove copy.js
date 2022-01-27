const es = require('event-stream');
const gutil = require('gulp-util');
const { JSDOM } = require('jsdom');

const attributes = ['move-before', 'move-to', 'move-after'];

function getDoctype(document) {
  if (document.doctype == null) {
    return '';
  }

  const node = document.doctype;

  return `<!DOCTYPE ${
    node.name
  }${node.publicId ? ` PUBLIC "${node.publicId}"` : ''
  }${!node.publicId && node.systemId ? ' SYSTEM' : ''
  }${node.systemId ? ` "${node.systemId}"` : ''
  }>`;
}

function getAllElementsWithAttribute(document, attribute) {
  const matchingElements = [];
  const allElements = document.getElementsByTagName('*');

  for (let i = 0, n = allElements.length; i < n; i++) {
    if (allElements[i].getAttribute(attribute) !== null) {
      // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}

export default (options = {}) => es.map((file, cb) => {
  try {
    const dom = new JSDOM(String(file.contents)).window;

    const { document } = dom;

    attributes.forEach((attribute) => {
      getAllElementsWithAttribute(document, attribute).forEach((element) => {
        let selector = element.getAttribute(attribute);
        let pseudo = '';
        let targets = null;
        let target = null;

        // Find pseudo class
        const tmp = selector.split(':');

        if (tmp.length === 2) {
          selector = tmp[0];
          pseudo = tmp[1];
        }

        targets = document.querySelectorAll(selector);

        switch (pseudo) {
          case 'first-child':
            target = targets[0];
            break;

          case 'last-child':
          default:
            target = targets[targets.length - 1];
            break;
        }

        element.removeAttribute(attribute);
        element.parentNode.removeChild(element);

        switch (attribute) {
          case 'move-before':
            target.parentNode.insertBefore(element, target);
            break;

          case 'move-to':
            target.innerHTML += element.outerHTML;
            break;

          case 'move-after':
            target.parentNode.insertBefore(element, target.nextSibling);
            break;
          default: // do nothing
        }
      });
    });

    if (typeof options.done === 'function') {
      const doc = options.done(document);

      if (doc) {
        document = doc;
      }
    }

    file.contents = new Buffer(getDoctype(document) + document.documentElement.outerHTML);

    return cb(null, file);
  } catch (err) {
    return cb(new gutil.PluginError('gulp-move-tags', err));
  }
});
