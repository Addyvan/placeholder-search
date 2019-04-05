import lunr from "lunr";

/**
 * 
 */
class BilingualSearchObject {
  
  constructor( data, englishKey, frenchKey, outputKey ) {
    this.data = data;

    this.englishKey = englishKey;
    this.frenchKey = frenchKey;
    this.outputKey = outputKey;

    this.searchIndexEN = [];
    this.searchIndexFR = [];
    this.searchReturnValuesEN = {};
    this.searchReturnValuesFR = {};

    if (englishKey === frenchKey) {
      console.warn("WARNING: english key provided is the same as french key provided. Search will be unilignual.");
    }

    if (data) {
      this.createSearchIndex(data);
      this.createSearchValues(data);
    } else {
      throw new Error("ERROR: data array for search is null");
    }

  }

  createSearchIndex(data) {
    var indexEN = [], indexFR = [];

    for (var i = 0; i < data.length; i++) {

      // Check for each row that the keys all exist. Throwing error because this borks the whole thing
      if (! data[i][this.englishKey] ) {
        throw new Error(`ERROR: English key: '${this.englishKey}' not valid for object ${i} in the data array provided for search`);
      }
      if (! data[i][this.frenchKey] ) {
        throw new Error(`ERROR: French key: '${this.frenchKey}' not valid for object ${i} in the data array provided for search`);
      }
      if (! data[i][this.outputKey] ) {
        throw new Error(`ERROR: Search Output key: '${this.outputKey}' not valid for object ${i} in the data array provided for search`);
      }

      indexEN.push({
        name: data[i][this.englishKey],
        path: data[i][this.outputKey]
      });
      indexFR.push({
        name: data[i][this.frenchKey],
        path: data[i][this.outputKey]
      });

    }

    this.searchIndexEN = lunr(function () {
      this.ref('path');
      this.field('name');
    
      for (var i = 0; i < indexEN.length; i++) {
        this.add(indexEN[i]);
      }
    });

    this.searchIndexFR = lunr(function () {
      this.ref('path');
      this.field('name');
    
      for (var i = 0; i < indexFR.length; i++) {
        this.add(indexFR[i]);
      }
    });

  }

  createSearchValues(data) {
    for (var i = 0; i < data.length; i++) {
      this.searchReturnValuesEN[data[i][this.outputKey]] = data[i][this.englishKey];
      this.searchReturnValuesFR[data[i][this.outputKey]] = data[i][this.frenchKey];
    }
  }

}

export default BilingualSearchObject;