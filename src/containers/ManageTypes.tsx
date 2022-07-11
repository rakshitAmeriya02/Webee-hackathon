import { useDispatch, useSelector } from "react-redux";
import CustomButton from "src/ui-core/Button";
import { AppState } from "src/store";
import { TypeForm } from "src/store/reducers/typesReducer";
import { doAddNewType } from "src/store/actions/typesAction";
import { Col, Row } from "react-bootstrap";
import TypesForm from "src/components/TypesForm";
import NavigationBar from "src/components/NavigationBar";

const ManageTypes = () => {
  const dispatch = useDispatch();
  const types = useSelector<AppState>((state) => state.types) as TypeForm[];
  const handleAddType = () => {
    dispatch(doAddNewType());
  };
  return (
    <div className="text-start p-4">
      <NavigationBar />
      <Row>
        {types.map((_, index) => (
          <Col xs={12} sm={6} md={4} key={`form-${index + 1}`}>
            <TypesForm index={index} />
          </Col>
        ))}
        <Col
          md={2}
          className="d-flex justify-content-center align-items-center"
        >
          <CustomButton onClick={handleAddType}>Add Type</CustomButton>
        </Col>
      </Row>
    </div>
  );
};

export default ManageTypes;
