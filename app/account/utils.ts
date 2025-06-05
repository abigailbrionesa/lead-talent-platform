export const all_skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Figma",
  "Leadership",
  "Python",
];

export const all_languages = ["English", "Spanish", "French", "German", "Chinese"];

export const all_careers = [
  "Biología",
  "Biotecnología",
  "Bioquímica",
  "Ciencias Ambientales",
  "Ciencias de la Computación",
  "Ciencias Físicas",
  "Ciencias Matemáticas",
  "Estadística",
  "Genética",
  "Microbiología",
  "Química",
  "Geología",
  "Geofísica",
  "Ingeniería de Sistemas",
  "Ingeniería de Software",
  "Ingeniería Informática",
  "Ciencia de Datos",
  "Ciberseguridad",
  "Inteligencia Artificial",
  "Ingeniería Civil",
  "Ingeniería Industrial",
  "Ingeniería Mecánica",
  "Ingeniería Electrónica",
  "Ingeniería Eléctrica",
  "Ingeniería Química",
  "Ingeniería de Telecomunicaciones",
  "Ingeniería de Minas",
  "Ingeniería Ambiental",
  "Ingeniería Biomédica",
  "Matemáticas",
  "Física",
  "Bioinformática",
  "Nanotecnología",
  "Arquitectura",
  "Tecnología Médica",
  "Otro",
];

export const ARRAY_FIELDS = ['skills', 'languages'];

export function toFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;

    if (ARRAY_FIELDS.includes(key)) {
      const arr = Array.isArray(value) ? value : [value];
      arr.forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, value);
    }
  }

  return formData;
}


export function formDataToObject(formData: FormData) {
  const obj: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    if (ARRAY_FIELDS.includes(key)) {
      if (obj[key]) {
        obj[key].push(value);
      } else {
        obj[key] = [value];
      }
    } else {
      if (obj[key]) {
        obj[key] = [obj[key], value];
      } else {
        obj[key] = value;
      }
    }
  }

  return obj;
}
