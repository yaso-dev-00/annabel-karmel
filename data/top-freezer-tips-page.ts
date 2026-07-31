export type FreezerTip = {
  title: string;
  body: string;
};

export const freezerTips: FreezerTip[] = [
  {
    title: 'Cool down',
    body: 'Ensure foods are cool before you freeze them. Freezing food when hot will increase the temperature of the freezer which could cause other foods to start defrosting.',
  },
  {
    title: 'Re-freeze fail',
    body: "Never re-freeze anything that's been frozen. Even if the food was frozen raw and then cooked, to be extra safe it still shouldn't be re-frozen.",
  },
  {
    title: 'Have your fill',
    body: "A full freezer is economical to run as the cold air doesn't need to circulate so much, so less power is needed. If you have lots of space free, don't forget you can freeze pretty much anything; fruit, chillies, potatoes, milk, cooked meat and bread. You can even freeze cheese with the exception of soft cheese.",
  },
  {
    title: 'Wrap it up',
    body: 'Make sure you wrap foods properly or put them in sealed containers, otherwise your food can get freezer-burn.',
  },
  {
    title: 'The good stuff',
    body: "Despite some old wives' tales, freezing food does not remove any nutrients. Freeze away!",
  },
  {
    title: 'All in proportion',
    body: "Freeze food in the sized portions you'll actually eat. Then you don't have to worry about planning ahead – simply take out and defrost what you need.",
  },
  {
    title: 'Ditch if in doubt',
    body: "Freezing foods renders bacteria inactive but doesn't actually kill anything. If it went in contaminated, once thawed it will still harbor the same harmful bacteria. Don't take any chances if you're not sure about something.",
  },
  {
    title: 'Freeze still fresh',
    body: "Freezing won't improve the quality of your food, but it will prevent it from deteriorating further. Don't freeze old food – it's unlikely you'll want to eat it again once defrosted.",
  },
  {
    title: 'Label away',
    body: 'Labelling may seem like a faff, but it will save you time when you need to know what it is and when it was frozen. Use a blue marker for raw foods and red for cooked.',
  },
  {
    title: 'Do defrost',
    body: "Unless you've purchased frozen food which can be cooked from frozen, defrosting is a must. We recommend defrost overnight in the fridge, use within 24 hours and cook till piping hot.",
  },
  {
    title: 'Defrost your freezer',
    body: 'An icy freezer is an inefficient one, so make sure you defrost your freezer if ice builds up. Most foods will remain frozen in the fridge for a couple of hours while the freezer defrosts.',
  },
];

export const doNotFreezeItems = [
  'Raw eggs in the shells will expand and crack',
  'Hard-boiled eggs go rubbery',
  'Vegetables with a high water content, such as lettuce, cucumber, bean sprouts and radishes, go limp and mushy',
  'Soft herbs, like parsley, basil and chives, go brown',
  'Egg-based sauces, such as mayonnaise, will separate and curdle',
  'Plain yogurt, low-fat cream cheese, single cream and cottage cheese go watery',
];

export const goodToFreezeItems = [
  'Butter and margarine can be frozen for 3 months',
  'Grated cheese can be frozen for up to 4 months and can be used straight from the freezer',
  'Most bread will freeze well for up to 3 months. Sliced bread can be toasted from frozen',
  'Milk will freeze for 1 month. Defrost in the fridge and shake well before using',
  'Raw pastry will freeze for 6 months and takes just 1 hour to thaw',
];
