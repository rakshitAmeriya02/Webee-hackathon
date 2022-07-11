import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DataForm from "src/components/DataForm";
import NavigationBar from "src/components/NavigationBar";
import { AppState } from "src/store";
import { doCreateNewItem } from "src/store/actions/dataActions";
import { DataState } from "src/store/reducers/dataReducer";
import { TypeForm } from "src/store/reducers/typesReducer";
import CustomButton from "src/ui-core/Button";

const TypeView = () => {
  const match = useParams();
  const typeId = match.typeId;
  const dispatch = useDispatch();
  const data = useSelector<AppState>((state) => state.data) as DataState;
  const types = useSelector<AppState>((state) => state.types) as TypeForm[];
  const filteredData = typeId ? data[typeId] || [] : [];

  const handleAddItem = () => {
    const selectedType = types.find((item) => item.id === typeId);
    const { object_title, object_type } = selectedType || {};
    const fields = (types.find((item) => item.id === typeId)?.fields || []).map(
      (item) => ({
        value: "",
        label: item.value,
        type: item.type,
      })
    );
    if (typeId) {
      dispatch(doCreateNewItem(typeId, object_title!, object_type!, fields));
    }
  };

  return (
    <div className="text-start p-4">
      <NavigationBar />
      <Row>
        {filteredData.map((data, index) => (
          <Col xs={12} sm={6} md={4} key={`form-${index + 1}`}>
            <DataForm data={data} index={index} />
          </Col>
        ))}
        <Col
          md={2}
          className="d-flex justify-content-center align-items-center"
        >
          <CustomButton onClick={handleAddItem}>Add Item</CustomButton>
        </Col>
      </Row>
    </div>
  );
};

export default TypeView;
