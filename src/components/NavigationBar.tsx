import { useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "src/store";
import { TypeForm } from "src/store/reducers/typesReducer";
import CustomButton from "src/ui-core/Button";
import MenuIcon from "src/ui-core/MenuIcon";
import { APP_ROUTES } from "src/utils/enums";
import useWindowWidth from "src/hooks/useWindowWidth";

import "./NavigationBar.css";

const NavigationBar = () => {
  const [showHeader, setShowHeader] = useState(false);
  const types = useSelector<AppState>((state) => state.types) as TypeForm[];
  const mobileScreen = useWindowWidth() < 576;
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
          redirectTo: APP_ROUTES.TYPE.replace(":typeId", type.id) as APP_ROUTES,
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
    <div className="mb-3 navigation">
      <Row className="navigationRow">
        <h3 className="pl-0 mb-0" style={{ width: "130px" }}>
          Objector
        </h3>
        {mobileScreen ? (
          showHeader ? (
            <div className={"d-flex items"} style={{ width: "unset" }}>
              {headerItems.map((item) => (
                <Link
                  className={clsx(
                    "mx-2 text-secondary",
                    item.redirectTo === window.location.pathname && "active"
                  )}
                  key={item.label}
                  to={item.redirectTo}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null
        ) : (
          <div className={"d-flex items"} style={{ width: "unset" }}>
            {headerItems.map((item) => (
              <Link
                className={clsx(
                  "mx-2 text-secondary",
                  item.redirectTo === window.location.pathname && "active"
                )}
                key={item.label}
                to={item.redirectTo}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </Row>
      <CustomButton
        className="menuButton"
        onClick={() => setShowHeader((prev) => !prev)}
      >
        <MenuIcon />
      </CustomButton>
    </div>
  );
};

export default NavigationBar;
