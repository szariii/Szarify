const ListElement = ({ id, name, surname, nick }: ShortedInfo) => {
  return (
    <div>
      <h2>
        {nick},{name} {surname}
      </h2>
    </div>
  );
};

export default ListElement;

interface ShortedInfo {
  id: number;
  name: string;
  surname: string;
  nick: string;
}
