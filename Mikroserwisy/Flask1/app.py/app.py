from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] ="sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db=SQLAlchemy(app)
ma = Marshmallow(app)

class Base(DeclarativeBase):
    pass
class Person(db.Model):
    id: Mapped[int] = mapped_column(db.Integer,primary_key=True)
    name: Mapped[str] = mapped_column(db.String)
    surname: Mapped[str] = mapped_column(db.String)
    job: Mapped[str] = mapped_column(db.String)

class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person

with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.add(Person(name="Staszek", surname="Barycki", job="Młody Gniewny"))
    db.session.commit()
@app.route('/', methods=['GET'])
def hello_world():
    return "witaj piękny nowy świecie"
@app.route('/create', methods=['POST'])
def add_new_person():
    data= request.form
    name = data.get('name')
    surname = data.get('surname')
    job = data.get("job")
    if name and surname and job:
        already_in_db=Person.query.filter_by(name=name,surname=surname,job=job).first()
        if already_in_db:
            return jsonify({'error': " taka osoba jest już w bazie danych "}), 2137
        new_person=Person(name=name,surname=surname,job=job)
        db.session.add(new_person)
        db.session.commit()
        return PersonSchema().dump(new_person)
    else:
        return jsonify({'error': 'złe dane '}), 400
@app.route('/persons')
def display_persons():
    persons=Person.query.all()
    return PersonSchema(many=True).dump(persons)
@app.route('/hello')
def hello():
    return 'Cześć'
@app.route('/hello/<int:id>')
def hello_id(id):
    person=Person.query.get(id)
    if person:
        name=person.name
        return jsonify({'message': "Siema: " + name + " Miło cie poznac"})
    return jsonify({'message': "Siema: John Miło cie poznac"})
@app.route('/person/<int:id>', methods=['GET'])
def get_person_by_id(id):
    person = Person.query.get(id)
    if person:
        return jsonify(PersonSchema().dump(person))
    else:
        return jsonify({'error':  'Osoba o podanym ID nie istnieje'}), 404
@app.route('/person/<string:name>')
def get_person_by_name(name):
    persons = Person.query.filter_by(name=name).all()
    return PersonSchema(many=True).dump(persons)
@app.route('/person/<string:name>/<string:surname>')
def get_person_by_surname(name,surname):
    persons = Person.query.filter_by(name=name, surname=surname).all()
    return PersonSchema(many=True).dump(persons)
@app.route('/update/<int:id>', methods=['PUT'])
def update_person(id):
    person = Person.query.get(id)

    if not person:
        return jsonify({'error':  'Osoba o podanym ID nie istnieje'}), 404

    name = request.form.get('name')
    surname = request.form.get('surname')
    job = request.form.get('job')

    if name:
        person.name = name
    if surname:
        person.surname = surname
    if job:
        person.job = job

    db.session.commit()
    return PersonSchema().dump(person)
@app.route("/delete/<int:id>", methods=['DELETE'])
def delete_by_id(id):
    person=Person.query.get(id)
    if person:
        db.session.delete(person)
        db.session.commit()
        return PersonSchema().dump(person)
    return jsonify({'error':  'Osoba o podanym ID nie istnieje'}), 404
if __name__ == '__main__':
    app.run()
