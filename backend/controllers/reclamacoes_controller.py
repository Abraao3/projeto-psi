from flask import Blueprint, jsonify
from backend.models import StatusReclamacao, Reclamacao


reclamacoes_bp = Blueprint('reclamacoes', __name__, url_prefix='/reclamacoes')

@reclamacoes_bp.route('/')
def reclamacoes():
    reclamacoes: list[Reclamacao] = Reclamacao.query.all()
    reclamacoes_to_dict = [reclamacao.to_dict() for reclamacao in reclamacoes]

    return jsonify({"reclamacoes": reclamacoes_to_dict}), 200

@reclamacoes_bp.route('/pendentes')
def reclamacoes_pendentes():
    reclamacoes: list[Reclamacao] = Reclamacao.query.filter(Reclamacao.status == StatusReclamacao.PENDENTE).all()
    reclamacoes_to_dict = [reclamacao.to_dict() for reclamacao in reclamacoes]

    return jsonify({"reclamacoes": reclamacoes_to_dict}), 200

@reclamacoes_bp.route('/resolvidas')
def reclamacoes_resolvidas():
    reclamacoes: list[Reclamacao] = Reclamacao.query.filter(Reclamacao.status == StatusReclamacao.RESOLVIDA).all()
    reclamacoes_to_dict = [reclamacao.to_dict() for reclamacao in reclamacoes]

    return jsonify({"reclamacoes": reclamacoes_to_dict}), 200

@reclamacoes_bp.route('/contestadas')
def reclamacoes_contestadas():
    reclamacoes: list[Reclamacao] = Reclamacao.query.filter(Reclamacao.status == StatusReclamacao.CONTESTADA).all()
    reclamacoes_to_dict = [reclamacao.to_dict() for reclamacao in reclamacoes]

    return jsonify({"reclamacoes": reclamacoes_to_dict}), 200