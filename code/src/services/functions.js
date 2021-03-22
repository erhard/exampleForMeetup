export const calc_empty_tags = state => {
  const empty = state.itemDataList.filter(element => {
    return element['tagsString'] == '' ? true : false;
  }).length;
  return empty;
};

export const changeTags = (oldTags, tagsData) => {
  let newTags = '';
  if (tagsData.operation == 'updateTags') {
    if (!oldTags.includes(tagsData.data)) {
      if (oldTags == '') {
        newTags = tagsData.data;
      } else {
        newTags = oldTags + ' ' + tagsData.data;
      }
    }
  }
  return newTags;
};


export const getByIndex = (arrayOfObjects, key, indexName = "id") => {
  const position = arrayOfObjects.findIndex(function (element) {
    return element[indexName] === key;
  });
  if (position != -1) {
    return arrayOfObjects[position]
  }
  return null;
};


export const  strip = (str)  => {
  return str.replace(/^\s+|\s+$/g, '');
}




export const getDateforInputField = (today=new Date()) => {
  const day = today.getDate().toString().padStart(2,"0");
  const month = (today.getMonth()+1).toString().padStart(2,"0");
  const year = today.getFullYear().toString();
  const retWert = year + "-" + month + "-" + day;
  console.log("Today is")
  console.log(retWert)
  return retWert;
}


export const empty_item =()=> {
  return {
    filename: null,
    found: "",
    leitsatz: "",
    category: "",
    country: "",
    court: "",
    sparte: "",
    tags: [],
    description: "",
    courtname: "",
    location: "",
    filenumber: "",
    date: getDateforInputField(),
    accessGroups: []
  }
 }






//Its much easier to test if you do not import the store but give it as param.
//ChangeItem is needed because in the action there is no access
//on the other elements of the state so the dependency must be made here
//the payLoad is modified, because it is the only param,
//which is accepted by dispatch
//here is the businesslogic an every item of the state can be changed
export const changeItem = (store, payload) => {
  if (payload.field == 'coupled') {
    const npayload = { changeId: payload.id, payload: payload };
    store.dispatch('updateItem', npayload);
  }
  //  //find in array
  const element2Change = store.state.itemDataList.find(element => {
    return element['id'] == payload.id;
  });
  //  //The element itself is coupled
  if (element2Change && element2Change['coupled']) {
    //iterate over all others
    store.state.itemDataList.forEach(element => {
      //if this element is coupled chnge it
      if (element['coupled']) {
        const newpayload = { changeId: element['id'], payload: payload };
        store.dispatch('updateItem', newpayload);
      }
    });
  } else {
    //if it is not coupled change only the element itself
    const newpayload = { changeId: payload['id'], payload: payload };
    store.dispatch('updateItem', newpayload);
  }
};
//

export const localized_url = url => {
  let locale = 'de';
  if (localStorage.locale) {
    locale = localStorage.locale;
  }
  return '/' + locale + url;
};

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const sleep = async function (time) {
  await timeout(time);
};

export const makeArrayUnique = (inputArray) => {
  const retAr = Array.from(new Set(inputArray));
  return retAr;
}


