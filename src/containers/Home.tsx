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

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector<AppState>((state) => state.data) as DataState;
  const types = useSelector<AppState>((state) => state.types) as TypeForm[];

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

  return (
    <div className="text-start p-4">
      <NavigationBar />
      <Row>
        {allData.map((data, index) => (
          <Col xs={12} sm={6} md={4} key={`form-${index + 1}`}>
            <DataForm data={data} index={index} />
          </Col>
        ))}
        <Col
          md={2}
          className="d-flex justify-content-center align-items-center"
        >
          <CustomDropdown
            title="Add Item"
            options={options}
            onChange={({ value }) => handleAddItem(value)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
