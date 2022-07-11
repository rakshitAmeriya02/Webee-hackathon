import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "src/store";
import { TypeForm } from "src/store/reducers/typesReducer";
import { APP_ROUTES } from "src/utils/enums";

const NavigationBar = () => {
  const types = useSelector<AppState>((state) => state.types) as TypeForm[];
  const headerItems = useMemo(() => {
    const defaultItems = [
      {
        label: "All",
        redirectTo: APP_ROUTES.ROOT,
      },
    ];
    types.forEach((type) => {
      if (type.object_type) {
        defaultItems.push({
          label: type.object_type,
          redirectTo: "#" as APP_ROUTES,
        });
      }
    });
    defaultItems.push({
      label: "Manage Types",
      redirectTo: APP_ROUTES.TYPES,
    });
    return defaultItems;
  }, [types]);
  return (
    <div className="d-flex align-items-center px-4 py-2 w-100">
      {headerItems.map((item) => (
        <Link className="mx-2" key={item.label} to={item.redirectTo}>
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default NavigationBar;
