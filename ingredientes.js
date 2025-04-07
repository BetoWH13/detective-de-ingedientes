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

// Función auxiliar para obtener iconos según categoría
function getIngredientIcon(category) {
  const icons = {
    'Endulzante': '🍯',
    'Endulzante artificial': '🧪',
    'Colorante artificial': '🎨',
    'Conservador': '🧂',
    'Espesante': '🔄',
    'Emulsionante': '🔀',
    'Humectante': '💧'
  };
  return icons[category] || '🧪';
}

function analyzeIngredient() {
  const input = document.getElementById("ingredientInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  const data = window.ingredientsData;
  const terms = input.split(',').map(t => t.trim()).filter(Boolean);

  if (terms.length === 0) {
    resultDiv.innerHTML = `
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <div class="flex items-center">
          <div class="flex-shrink-0">ℹ️</div>
          <div class="ml-3">
            <p class="text-yellow-700">Por favor, ingresa al menos un ingrediente para analizar.</p>
          </div>
        </div>
      </div>`;
    return;
  }

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
      resultDiv.innerHTML += `
        <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div class="flex items-center">
            <div class="flex-shrink-0">❌</div>
            <div class="ml-3">
              <p class="text-red-700">Ingrediente no encontrado: <strong>${term}</strong></p>
            </div>
          </div>
        </div>`;
      return;
    }

    const ing = data[matchKey];
    const concerns = ing.concerns
      .map(c => `
        <li class="flex items-start gap-3 mb-2">
          <div class="flex-shrink-0 w-5 h-5 mt-0.5">⚠️</div>
          <div class="flex-grow">
            <p class="text-gray-700">${c}</p>
          </div>
        </li>`)
      .join('');

    const alternatives = ing.alternatives.length
      ? ing.alternatives.map(a => `
        <li class="flex items-start gap-3 mb-2">
          <div class="flex-shrink-0 w-5 h-5 mt-0.5">✅</div>
          <div class="flex-grow">
            <a href="${a.link}" 
               target="_blank" 
               class="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              ${a.name}
            </a>
            <div class="flex flex-wrap gap-2 mt-1">
              ${a.badges.map(b => 
                `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  ${b}
                </span>`
              ).join('')}
            </div>
          </div>
        </li>`)
      .join('')
      : '<p class="text-gray-500 text-sm italic">No hay alternativas sugeridas para este ingrediente.</p>';

    resultDiv.innerHTML += `
      <div class="bg-white border border-gray-200 shadow-sm rounded-xl p-6 transform transition-all duration-200 hover:shadow-md">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-grow">
            <div class="flex items-center gap-2">
              <span class="text-2xl">${getIngredientIcon(ing.category)}</span>
              <h3 class="text-xl font-bold text-gray-900">${ing.name}</h3>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                ${ing.category}
              </span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ${matchType}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <h4 class="text-sm font-semibold text-gray-900 mb-2">⚠️ Preocupaciones:</h4>
          <ul class="space-y-2">
            ${concerns}
          </ul>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-100">
          <h4 class="text-sm font-semibold text-gray-900 mb-2">✨ Alternativas sugeridas:</h4>
          <ul class="space-y-2">
            ${alternatives}
          </ul>
        </div>
      </div>`;
  });
}

// Autocompletado mejorado
document.getElementById("ingredientInput").addEventListener("input", function() {
  const suggestionsDiv = document.getElementById("suggestions");
  const val = this.value.toLowerCase();
  
  if (val.length < 2) {
    suggestionsDiv.classList.add('hidden');
    return;
  }

  const matches = Object.keys(window.ingredientsData)
    .filter(k => k.includes(val))
    .slice(0, 5);

  if (matches.length) {
    suggestionsDiv.innerHTML = matches
      .map(m => {
        const category = window.ingredientsData[m].category;
        return `
          <div class="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200" 
               onclick="selectIngredient('${m}')">
            <div class="flex items-center gap-2">
              <span>${getIngredientIcon(category)}</span>
              <span class="font-medium">${m}</span>
              <span class="text-xs text-gray-500">[${category}]</span>
            </div>
          </div>`;
      })
      .join('');
    suggestionsDiv.classList.remove('hidden');
  } else {
    suggestionsDiv.classList.add('hidden');
  }
});

// Función para seleccionar sugerencia
function selectIngredient(ingredient) {
  document.getElementById("ingredientInput").value = ingredient;
  document.getElementById("suggestions").classList.add('hidden');
  analyzeIngredient();
}

// Cerrar sugerencias al hacer clic fuera
document.addEventListener('click', function(e) {
  if (!e.target.closest('#ingredientInput')) {
    document.getElementById("suggestions").classList.add('hidden');
  }
});
