// ✅ BASE DE DATOS COMPLETA DE INGREDIENTES PARA LATAM
window.ingredientsData = {
  "jarabe de maíz de alta fructosa": {
    "name": "Jarabe de maíz de alta fructosa",
    "category": "Endulzante",
    "concerns": ["Vinculado a la obesidad y resistencia a la insulina", "Altamente procesado"],
    "alternatives": [{
      "name": "Jarabe de arce natural",
      "badges": ["Menos procesado", "Alternativa natural"],
      "link": "https://www.amazon.com/dp/B0000DIX7U?tag=emunabitajon4-20"
    }]
  },
  "aspartame": {
    "name": "Aspartame",
    "category": "Endulzante artificial",
    "concerns": ["Controversia sobre efectos neurológicos", "Evitar en personas con PKU"],
    "alternatives": [{
      "name": "Stevia líquida",
      "badges": ["Cero calorías", "De origen vegetal"],
      "link": "https://www.amazon.com/dp/B00O9YIVZG?tag=emunabitajon4-20"
    }]
  },
  "goma xantana": {
    "name": "Goma xantana",
    "category": "Espesante",
    "concerns": ["Puede causar gases o hinchazón", "Fermentación bacteriana altamente procesada"],
    "alternatives": [{
      "name": "Harina de arrurruz",
      "badges": ["Sin gluten", "Base natural"],
      "link": "https://www.amazon.com/dp/B00G2XGC88?tag=emunabitajon4-20"
    }]
  },
  "rojo 40": {
    "name": "Rojo 40 (Allura Red)",
    "category": "Colorante artificial",
    "concerns": ["Vinculado a hiperactividad", "Puede causar reacciones alérgicas"],
    "alternatives": [{
      "name": "Colorante rojo vegetal ColorKitchen",
      "badges": ["A base de plantas", "Sin colores sintéticos"],
      "link": "https://www.amazon.com/dp/B07C3JY51F?tag=emunabitajon4-20"
    }]
  },
  "amarillo 5": {
    "name": "Amarillo 5 (Tartrazina)",
    "category": "Colorante artificial",
    "concerns": ["Puede causar urticaria", "Vinculado a problemas de comportamiento en niños"],
    "alternatives": [{
      "name": "Colorante natural Supernatural",
      "badges": ["Sin colorantes sintéticos", "Apto para niños"],
      "link": "https://www.amazon.com/dp/B07VC9J6G9?tag=emunabitajon4-20"
    }]
  },
  "bht": {
    "name": "BHT (Hidroxibutil tolueno)",
    "category": "Conservador",
    "concerns": ["Posible alterador endocrino", "Prohibido en algunos países"],
    "alternatives": [{
      "name": "Tocoferoles naturales (Vitamina E)",
      "badges": ["Antioxidante", "Alternativa natural"],
      "link": "https://www.amazon.com/dp/B00H4EM6J6?tag=emunabitajon4-20"
    }]
  },
  "sorbato de potasio": {
    "name": "Sorbato de potasio",
    "category": "Conservador",
    "concerns": ["Aditivo sintético", "Puede causar alergias en personas sensibles"],
    "alternatives": [{
      "name": "Extracto fermentado de rábano",
      "badges": ["Etiqueta limpia", "Preservante natural"],
      "link": "https://www.amazon.com/dp/B0BJL2WN7P?tag=emunabitajon4-20"
    }]
  },
  "lecitina de soya": {
    "name": "Lecitina de soya",
    "category": "Emulsionante",
    "concerns": ["Alergénico común", "Altamente procesado"],
    "alternatives": [{
      "name": "Lecitina de girasol",
      "badges": ["Sin soya", "No transgénico"],
      "link": "https://www.amazon.com/dp/B01M0QJY75?tag=emunabitajon4-20"
    }]
  },
  "polisorbato 80": {
    "name": "Polisorbato 80",
    "category": "Emulsionante",
    "concerns": ["Vinculado a inflamación intestinal en estudios animales", "Aditivo sintético"],
    "alternatives": [{
      "name": "Lecitina de soya orgánica",
      "badges": ["Certificada", "De origen vegetal"],
      "link": "https://www.amazon.com/dp/B005P0IKB4?tag=emunabitajon4-20"
    }]
  },
  "glicerina": {
    "name": "Glicerina",
    "category": "Humectante",
    "concerns": ["Puede derivar de origen animal o vegetal", "Sensibilidad kosher depende de la certificación"],
    "alternatives": [{
      "name": "Glicerina vegetal NOW",
      "badges": ["A base de plantas", "Apto kosher"],
      "link": "https://www.amazon.com/dp/B0009ET93G?tag=emunabitajon4-20"
    }]
  }
};

const fuse = new Fuse(Object.keys(window.ingredientsData), { includeScore: true, threshold: 0.4 });

function analyzeIngredient() {
  const input = document.getElementById("ingredientInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  const data = window.ingredientsData;
  const terms = input.split(',').map(t => t.trim()).filter(Boolean);

  terms.forEach(term => {
    let matchKey = null;
    let matchType = "";

    if (data[term]) {
      matchKey = term;
      matchType = "Coincidencia exacta";
    } else {
      const fuzzy = fuse.search(term);
      if (fuzzy.length > 0 && fuzzy[0].score <= 0.4) {
        matchKey = fuzzy[0].item;
        matchType = "Coincidencia aproximada";
      }
    }

    if (!matchKey) {
      resultDiv.innerHTML += `<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">❌ Ingrediente no encontrado: <strong>${term}</strong></div>`;
      return;
    }

    const ing = data[matchKey];
    const concerns = ing.concerns.map(c => `<li>⚠️ ${c}</li>`).join('');
    const alternatives = ing.alternatives.length
      ? ing.alternatives.map(a => `
        <li>
          <a href="${a.link}" target="_blank" class="text-blue-600 underline font-medium">${a.name}</a>
          <span class="text-xs text-gray-500">(${a.badges.join(", ")})</span>
        </li>`).join('')
      : '<p class="text-gray-500 text-sm">No hay alternativas sugeridas.</p>';

    resultDiv.innerHTML += `
      <div class="bg-white border border-gray-200 shadow-md rounded-xl p-5 mb-6">
        <h3 class="text-xl font-bold mb-1">${ing.name} <span class="text-sm text-gray-500">[${ing.category}]</span> <span class="text-xs text-green-600">(${matchType})</span></h3>
        <ul class="list-disc list-inside text-gray-800 text-sm mb-2">${concerns}</ul>
        <div>
          <strong class="text-sm text-gray-700">Alternativas sugeridas:</strong>
          <ul class="list-disc list-inside mt-1">${alternatives}</ul>
        </div>
      </div>
    `;
  });
}

document.getElementById("ingredientInput").addEventListener("input", function () {
  const list = Object.keys(window.ingredientsData);
  const val = this.value.toLowerCase();
  const matches = list.filter(k => k.includes(val)).slice(0, 5);
  if (matches.length && val.length > 2) {
    this.setAttribute("title", `Sugerencias: ${matches.join(", ")}`);
  } else {
    this.removeAttribute("title");
  }
});
