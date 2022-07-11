import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import DataForm from "src/components/DataForm";
import NavigationBar from "src/components/NavigationBar";
import CustomDropdown, { DropdownOption } from "src/ui-core/Dropdown";
import { AppState } from "src/store";
import { Data, DataState } from "src/store/reducers/dataReducer";
import { TypeForm } from "src/store/reducers/typesReducer";
import { doCreateNewItem } from "src/store/actions/dataActions";
import CustomButton from "src/ui-core/Button";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "src/utils/enums";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector<AppState>((state) => state.data) as DataState;
  const types = useSelector<AppState>((state) => state.types) as TypeForm[];
  const navigate = useNavigate();

  const allData = useMemo(() => {
    const formattedData = Object.keys(data).reduce((arr, key) => {
      data[key].forEach((item) => {
        arr.push(item);
      });
      return arr;
    }, [] as Data[]);
    return formattedData;
  }, [data]);

  const options = useMemo(() => {
    const list: DropdownOption[] = [];
    types.forEach((item, index) => {
      list.push({
        label: item.object_type,
        value: item.id,
        order: index + 1,
      });
    });
    return list;
  }, [types]);

  const handleAddItem = (typeId: string) => {
    const selectedType = types.find((item) => item.id === typeId);
    const { object_title, object_type } = selectedType || {};
    const fields = (types.find((item) => item.id === typeId)?.fields || []).map(
      (item) => ({
        value: "",
        label: item.value,
        type: item.type,
      })
    );
    dispatch(doCreateNewItem(typeId, object_title!, object_type!, fields));
  };

  const handleRedirection = () => navigate(APP_ROUTES.TYPES);

  return (
    <div className="text-start p-4">
      <NavigationBar />
      <Row>
        {allData.map((data, index) => (
          <Col
            xs={12}
            sm={6}
            md={4}
            key={`form-${index + 1}`}
            style={{
              border: "1px solid #cbc4c4",
              borderRadius: "5px",
              marginRight: "10px",
            }}
            className="mr-3 px-0 mb-2"
          >
            <DataForm data={data} index={index} />
          </Col>
        ))}
        {options.length ? (
          <Col
            md={2}
            className="d-flex justify-content-center align-items-center p-0 mx-auto"
          >
            <CustomDropdown
              title="Add Item"
              options={options}
              onChange={({ value }) => handleAddItem(value)}
            />
          </Col>
        ) : (
          <div className="text-center">
            <h3>Please add types to the invetory</h3>
            <CustomButton onClick={handleRedirection}>
              Go to Inventory
            </CustomButton>
          </div>
        )}
      </Row>
    </div>
  );
};

export default Home;
