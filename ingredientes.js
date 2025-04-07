// ✅ BASE DE DATOS DE INGREDIENTES Y FUNCIÓN DE ANÁLISIS (LATAM)
window.ingredientsData = {
  "jarabe de maíz de alta fructosa": {
    "name": "Jarabe de maíz de alta fructosa",
    "category": "Endulzante",
    "concerns": ["Vinculado a la obesidad y resistencia a la insulina", "Altamente procesado"],
    "alternatives": [{
      "name": "Jarabe de arce natural",
      "badges": ["Endulzante natural", "Menos procesado"],
      "link": "https://www.amazon.com/dp/B0000DIX7U?tag=emunabitajon4-20"
    }]
  },
  "aspartame": {
    "name": "Aspartame",
    "category": "Endulzante",
    "concerns": ["Controversia sobre efectos neurológicos", "Evitar en personas con fenilcetonuria (PKU)"],
    "alternatives": [{
      "name": "Stevia líquida",
      "badges": ["Sin calorías", "Origen vegetal"],
      "link": "https://www.amazon.com/dp/B00O9YIVZG?tag=emunabitajon4-20"
    }]
  },
  "goma xantana": {
    "name": "Goma xantana",
    "category": "Espesante",
    "concerns": ["Puede causar gases o hinchazón", "Fermentación bacteriana industrial"],
    "alternatives": [{
      "name": "Polvo de arrurruz",
      "badges": ["Alimento integral", "Libre de gluten"],
      "link": "https://www.amazon.com/dp/B00G2XGC88?tag=emunabitajon4-20"
    }]
  },
  "enzimas": {
    "name": "Enzimas",
    "category": "Ayudante de procesamiento",
    "concerns": ["Pueden derivarse de fuentes microbianas, animales o vegetales", "Sensibilidad kosher depende de la fuente"],
    "kosherSensitive": true,
    "alternatives": []
  },
  "azúcar": {
    "name": "Azúcar",
    "category": "Endulzante",
    "concerns": ["Consumo excesivo", "Problemas metabólicos"],
    "alternatives": [{
      "name": "Azúcar de coco",
      "badges": ["Índice glucémico más bajo"],
      "link": "https://www.amazon.com/dp/B00AHTVAPI?tag=emunabitajon4-20"
    }]
  },
  "colorante rojo 40": {
    "name": "Colorante Rojo 40 (Allura Red)",
    "category": "Colorante",
    "concerns": ["Asociado a hiperactividad", "Puede causar reacciones alérgicas"],
    "alternatives": [{
      "name": "Colorante rojo vegetal ColorKitchen",
      "badges": ["De origen vegetal", "Sin colorantes artificiales"],
      "link": "https://www.amazon.com/dp/B07C3JY51F?tag=emunabitajon4-20"
    }]
  },
  "colorante amarillo 5": {
    "name": "Colorante Amarillo 5 (Tartrazina)",
    "category": "Colorante",
    "concerns": ["Puede causar urticaria", "Asociado a trastornos de conducta en niños"],
    "alternatives": [{
      "name": "Colorante amarillo Supernatural",
      "badges": ["Sin tintes sintéticos", "Seguro para niños"],
      "link": "https://www.amazon.com/dp/B07VC9J6G9?tag=emunabitajon4-20"
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
    const alternatives = ing.alternatives.length ? ing.alternatives.map(a => `
      <li>
        <a href="${a.link}" target="_blank" class="text-blue-600 underline font-medium">${a.name}</a>
        <span class="text-xs text-gray-500">(${a.badges.join(", ")})</span>
      </li>`).join('') : '<p class="text-gray-500 text-sm">No se listan alternativas.</p>';

    resultDiv.innerHTML += `
      <div class="bg-white border border-gray-200 shadow-md rounded-xl p-5 mb-6">
        <h3 class="text-xl font-bold mb-1">${ing.name} <span class="text-sm text-gray-500">[${ing.category}]</span></h3>
        <ul class="list-disc list-inside text-gray-800 text-sm mb-2">${concerns}</ul>
        <div>
          <strong class="text-sm text-gray-700">Alternativas sugeridas:</strong>
          <ul class="list-disc list-inside mt-1">${alternatives}</ul>
        </div>
      </div>
    `;
  });
}

document.getElementById("ingredientInput").addEventListener("input", function() {
  const list = Object.keys(window.ingredientsData);
  const val = this.value.toLowerCase();
  const matches = list.filter(k => k.includes(val)).slice(0, 5);
  if (matches.length && val.length > 2) {
    this.setAttribute("title", `Sugerencias: ${matches.join(", ")}`);
  } else {
    this.removeAttribute("title");
  }
});
