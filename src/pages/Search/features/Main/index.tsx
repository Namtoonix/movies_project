/* eslint-disable react-hooks/exhaustive-deps */
import { Loading } from "components/Loading/lazyload";
import { NoData } from "components/NoData/lazyload";
import { SearchItem } from "components/SearchItem/lazyload";
import { ToastMessage } from "components/ToastMessage/lazyload";
import { ModelSearch } from "models/Search";
import { useStore } from "pages/Search/context/store";
import { EffectCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { handleQueryString } from "utils/helper";

function Main() {
  const { dispatch, actions, state } = useStore();
  const { loading, error, results, totalPage, page } = state;
  const { getResults } = ModelSearch();

  const location = useLocation();
  const { query } = handleQueryString(location.search);

  const useEffectDidMount = (effect: EffectCallback) => {
    useEffect(effect, [query, page]);
  };

  useEffectDidMount(() => {
    if (query) {
      apiSearch(query);
    }
  });

  const apiSearch = async (query: string) => {
    dispatch(actions.getSearchResults());

    const { data, isError } = await getResults({ query: query, page: page });
    if (isError) {
      dispatch(actions.getSearchResultsError(data.message || "Fetch error!"));
    } else {
      dispatch(actions.getSearchResultsSuccess([...results, ...data.results]));
      if (totalPage === 0) {
        dispatch(actions.setTotalPage(data.total_pages));
      }
    }
  };

  return (
    <div className="relative">
      <h2 className="lg:text-[36px] text-[18px] font-[700] text-white">
        Search results
      </h2>
      {results.length ? (
        <>
          {results.map((result: any) => (
            <SearchItem id={result.id} />
          ))}
          {page < totalPage && (
            <div className="flex justify-center">
              <span
                className="cursor-pointer px-[12px] py-[6px] bg-[#fff] text-[#0d243f] hover:bg-[#0d243f] hover:text-[#fff] rounded-full"
                onClick={() => dispatch(actions.setPage(page + 1))}
              >
                View more
              </span>
            </div>
          )}
        </>
      ) : (
        <NoData />
      )}
      {loading && (
        <div className="absolute inset-0 bg-[#fffa]">
          <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
            <Loading height="340px" />
          </div>
        </div>
      )}
      {error && <ToastMessage message={error} />}
    </div>
  );
}

export default Main;
