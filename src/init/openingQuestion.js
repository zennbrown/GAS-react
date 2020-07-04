import cls from 'cli-select';
import clc from 'cli-color';

const openingQuestion = () => cls({
  values: ['Yes', 'No'],
  valueRenderer: (value, selected) => {
    if (selected) {
      return clc.red(value);
    }
    return value;
  },
  cleanup: false,
});

export default openingQuestion;
