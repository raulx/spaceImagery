import NavigationBar from "../components/NavigationBar";
import {
  Card,
  CardBody,
  Button,
  Divider,
  Select,
  SelectItem,
  DatePicker,
} from "@nextui-org/react";

function MarsImagesPage() {
  return (
    <>
      <NavigationBar />
      <section id="mars-search-box">
        <Card className=" max-w-[400px] mx-auto my-2" shadow="sm" radius="sm">
          <CardBody className="flex flex-col gap-4">
            <div className="flex justify-between border rounded-2xl p-4 ">
              <div className=" self-center">Search By:</div>
              <div className="flex justify-center items-center gap-6">
                <div className="flex flex-col  items-center gap-4">
                  <label htmlFor="earth">Earth Day</label>
                  <input
                    type="radio"
                    value="earth"
                    id="earth"
                    className="w-8 h-8 text-gray-500"
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                  <label htmlFor="earth">Martian Sol</label>
                  <input
                    type="radio"
                    value="earth"
                    id="earth"
                    className="w-8 h-8"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="w-1/2">
                <Select label="Select Camera" color="secondary">
                  <SelectItem key={1}>FHAZ</SelectItem>
                  <SelectItem key={2}>RHAZ</SelectItem>
                  <SelectItem key={3}>MAST</SelectItem>
                  <SelectItem key={4}>CHEMCAM</SelectItem>
                  <SelectItem key={5}>MAHLI</SelectItem>
                </Select>
              </div>
              <div className="w-1/2">
                <DatePicker label="Image Date" color="secondary" />
              </div>
            </div>
            <Button className="w-1/4 mx-auto" color="secondary">
              Search
            </Button>
          </CardBody>
        </Card>
      </section>
      <Divider className="my-4" />
    </>
  );
}

export default MarsImagesPage;
