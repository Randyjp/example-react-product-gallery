const Colors = {
  grayScale: {
    black: '#000',
    darkGray: '#373738',
    darkGray2: '#585858',
    darkGray3: '##5C5C5C',
    lightgray: '#E4E4E4',
    lightgray2: '#B8B8B8',
    white: '#FFF',
  },
  yellow: {
    primary: '#FFDE00',
    gold: '#F8CB00',
  },
};
const Shadows = {
  box: {
    card: '0 4px 14px 7px rgba(121, 121, 121, 0.05)',
    modal: '0 16px 34px 7px rgba(121, 121, 121, 0.1);',
  },
};

const Borders = {
  grey1px: `1px solid ${Colors.grayScale.lightgray}`,
  grey1px2: `1px solid ${Colors.grayScale.lightgray2}`,
  gold2px: `1px solid ${Colors.yellow.gold}`,
};

export default { Borders, Colors, Shadows };
