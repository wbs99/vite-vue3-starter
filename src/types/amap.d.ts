declare namespace AMap {
  interface DistrictSearch {
    search: (keyword: string, callback: (status: string, result: DistrictSearch.Result) => void) => void;
  }

  namespace DistrictSearch {
    interface Result {
      districtList: Array<{
        boundaries: Array<Array<LngLat>>;
      }>;
    }
  }
}

