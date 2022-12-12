import { lazy, Suspense } from "react";

interface ILazyLoad {
  cb: any;
  fallback?: any;
}

const Loadable = (Component: any, fallback: any) => (props: any) => {
  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export const LazyLoad = (props: ILazyLoad) => {
  const { cb, fallback } = props;
  return Loadable(lazy(cb), fallback);
};

Loadable.defaultProps = {
  cb: () => {},
  fallback: null,
};
